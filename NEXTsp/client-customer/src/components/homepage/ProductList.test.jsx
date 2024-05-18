// ProductList.test.js
import React from 'react';
const { render, screen } = require('@testing-library/react');
require('@testing-library/jest-dom');
const axiosMock = require('axios');

import ProductList from './ProductList';

jest.mock('axios');

describe('ProductList', () => {
    beforeEach(() => {
        // Mock Axios response for successful data fetching
        axiosMock.get.mockResolvedValueOnce({
            data: {
                products: [
                    [
                        {
                            "id": "6627d52370a256e0898d5588",
                            "nameProduct": "iPhone 13 Pro",
                            "description": "iPhone 13 Pro là phiên bản cao cấp nhất của dòng sản phẩm iPhone 13, với màn hình OLED Super Retina XDR, hệ thống camera tiên tiến và chip A15 Bionic mạnh mẽ.",
                            "price": 25990000,
                            "oldprice": 27990000,
                            "images": [
                                "https://res.cloudinary.com/dtvhqvucg/image/upload/v1713886499/NEXTsp/lphlrcrzpgchcvaebnl4.jpg"
                            ],
                            "numReviews": 1,
                            "averageRating": 5,
                            "brand": {
                                "name": "Apple",
                                "id": "6627d46123a2efd262dc6109"
                            },
                            "category": {
                                "name": "Điện thoại di động",
                                "id": "6605bb802cc08acab256bf44"
                            },
                            "status": "Active"
                        }
                    ]]
            }
        });
    });

    it('renders loading spinner when loading', () => {
        render(<ProductList title="Test" />);
        expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    });

    it('renders product list when data is loaded', async () => {
        render(<ProductList title="Test" />);
        // Wait for data to be fetched
        await screen.findByTestId('product-list');
        // Assert that product list is rendered
        expect(screen.getByTestId('product-list')).toBeInTheDocument();
    });

    // Add more tests based on the outlined scenarios
});
