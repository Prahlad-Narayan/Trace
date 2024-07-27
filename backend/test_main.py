from fastapi.testclient import TestClient
from main import app
import pytest

client = TestClient(app)

def test_get_all_companies():
    # Test to ensure the endpoint returns a list of companies
    response = client.get("/companies")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_get_company_details():
    # Test to check if the endpoint returns details of a company with ID 1
    response = client.get("/companies/1")
    assert response.status_code == 200
    assert response.json()["company_id"] == 1

def test_get_company_details_not_found():
    # Test to ensure the endpoint returns a 404 error for a non-existent company ID
    response = client.get("/companies/999")
    assert response.status_code == 404
    assert response.json()["detail"] == "Company not found"

def test_get_company_locations():
    # Test to check if the endpoint returns locations for a company with ID 1
    response = client.get("/companies/1/locations")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_get_company_locations_not_found():
    # Test to ensure the endpoint returns a 404 error for a company with no locations
    response = client.get("/companies/999/locations")
    assert response.status_code == 404
    assert response.json()["detail"] == "No locations found for this company"
