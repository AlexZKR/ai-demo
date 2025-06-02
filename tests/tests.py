import requests
import pytest

API_URL = "https://fakestoreapi.com/products"

@pytest.fixture(scope="module")
def api_response():
    response = requests.get(API_URL)
    return response

@pytest.fixture(scope="module")
def products(api_response):
    return api_response.json()

def validate_title(product):
    return bool(product.get('title') and str(product['title']).strip())

def validate_price(product):
    price = product.get('price')
    return isinstance(price, (int, float)) and price >= 0

def validate_rating_rate(product):
    rating = product.get('rating', {})
    rate = rating.get('rate')
    return isinstance(rate, (int, float)) and rate <= 5

def get_defective_products(products):
    defective_products = []
    for product in products:
        defects = []
        if not validate_title(product):
            defects.append('Missing or empty title')
        if not validate_price(product):
            defects.append('Negative or invalid price')
        rating = product.get('rating', {})
        if 'rate' not in rating or not validate_rating_rate(product):
            defects.append('rating.rate exceeds 5 or is invalid')
        if defects:
            defective_products.append({'id': product.get('id'), 'defects': defects, 'product': product})
    return defective_products

def test_response_code(api_response):
    assert api_response.status_code == 200, f"Expected status code 200, got {api_response.status_code}"

def test_title_presence(products):
    defective = [p for p in products if not validate_title(p)]
    assert not defective, f"Products with missing or empty title: {[p.get('id') for p in defective]}"

def test_price_non_negative(products):
    defective = [p for p in products if not validate_price(p)]
    assert not defective, f"Products with negative or invalid price: {[p.get('id') for p in defective]}"

def test_rating_rate_max_5(products):
    defective = [p for p in products if 'rate' not in p.get('rating', {}) or not validate_rating_rate(p)]
    assert not defective, f"Products with rating.rate > 5 or invalid: {[p.get('id') for p in defective]}"

def test_list_defective_products(products):
    defective_products = get_defective_products(products)
    if defective_products:
        print("\nDefective products found:")
        for defect in defective_products:
            print(f"Product ID: {defect['id']}, Defects: {defect['defects']}")
    else:
        print("\nNo defective products found.")
