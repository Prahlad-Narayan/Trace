from fastapi.testclient import TestClient
from main import app
import pytest

client = TestClient(app)

def test_get_all_companies():
    response = client.get("/companies")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_get_company_details():
    response = client.get("/companies/1")
    assert response.status_code == 200
    assert response.json()["company_id"] == 1

def test_get_company_details_not_found():
    response = client.get("/companies/999")
    assert response.status_code == 404
    assert response.json()["detail"] == "Company not found"

def test_get_company_locations():
    response = client.get("/companies/1/locations")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_get_company_locations_not_found():
    response = client.get("/companies/999/locations")
    assert response.status_code == 404
    assert response.json()["detail"] == "No locations found for this company"
