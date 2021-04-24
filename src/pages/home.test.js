/* eslint-disable jest/no-mocks-import */
import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userNotFound from '../__mocks__/userNotFound.json';
import userReposNotFound from '../__mocks__/userReposNotFound.json';
import userReposFound from '../__mocks__/userReposFound.json';
import userFound from '../__mocks__/userFound.json';

import Home from './home';

let assignMock = jest.fn();

delete window.location;
window.location = { assign: assignMock };

beforeEach(() => {
    jest.restoreAllMocks()
    assignMock.mockClear();
})

afterAll(() => {
    jest.restoreAllMocks()
})

test('renders component', async () => {
    const { getByText } = render(<Home/>)
    expect(getByText('GitHub User Repos')).toBeInTheDocument();
    expect(getByText('Status:')).toBeInTheDocument();
    expect(getByText('Nazwa repozytorium')).toBeInTheDocument();
    expect(getByText('Liczba gwiazdek')).toBeInTheDocument();
})

test('shows error status after username is invalid', async () => {
    const { getByLabelText, getByText } = render(<Home/>);
    const input = getByLabelText('input-username');
    const submit = getByLabelText('submit');

    fireEvent.change(input, {target: {value: 'john-doe-'}})
    fireEvent.click(submit)
    const text = await waitFor(() => getByText('Nieprawidłowa nazwa użytkownika'))
    expect(text).toBeInTheDocument()
})

test('shows error status after user is not found', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
        json: () => Promise.resolve(userNotFound)
    }))
    const { getByLabelText, getByText } = render(<Home/>);
    const input = getByLabelText('input-username');
    const submit = getByLabelText('submit');

    fireEvent.change(input, {target: {value: 'noGithubUser'}})
    fireEvent.click(submit)
    const text = await waitFor(() => getByText('Nie znaleziono użytkownika'))
    expect(text).toBeInTheDocument()
})

test('shows error status after user repos is not found', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
        json: () => Promise.resolve(userFound)
    }))
    const { getByLabelText, getByText } = render(<Home/>);
    const input = getByLabelText('input-username');
    const submit = getByLabelText('submit');

    fireEvent.change(input, {target: {value: 'GithubUser'}})
    fireEvent.click(submit)

    jest.restoreAllMocks()
    jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
        json: () => Promise.resolve(userReposNotFound)
    }))

    const text = await waitFor(() => getByText('Brak repozytoriów dla: GithubUser'))
    expect(text).toBeInTheDocument()
})

test('shows succes status after user repos is found', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
        json: () => Promise.resolve(userFound)
    }))
    const { getByLabelText, getByText } = render(<Home/>);
    const input = getByLabelText('input-username');
    const submit = getByLabelText('submit');

    fireEvent.change(input, {target: {value: 'GithubUser'}})
    fireEvent.click(submit)

    jest.restoreAllMocks()
    jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
        json: () => Promise.resolve(userReposFound)
    }))

    const text = await waitFor(() => getByText('Znaleziono repozytoria dla: GithubUser (1)'))
    expect(text).toBeInTheDocument()
})

test('shows repos name after succes status', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
        json: () => Promise.resolve(userFound)
    }))
    const { getByLabelText, getByText } = render(<Home/>);
    const input = getByLabelText('input-username');
    const submit = getByLabelText('submit');

    fireEvent.change(input, {target: {value: 'GithubUser'}})
    fireEvent.click(submit)

    jest.restoreAllMocks()
    jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
        json: () => Promise.resolve(userReposFound)
    }))

    const text = await waitFor(() => getByText('github-user-repos'))
    expect(text).toBeInTheDocument()
})

test('shows repos stargazers_count after succes status', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
        json: () => Promise.resolve(userFound)
    }))
    const { getByLabelText, getByText } = render(<Home/>);
    const input = getByLabelText('input-username');
    const submit = getByLabelText('submit');

    fireEvent.change(input, {target: {value: 'GithubUser'}})
    fireEvent.click(submit)

    jest.restoreAllMocks()
    jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
        json: () => Promise.resolve(userReposFound)
    }))

    const text = await waitFor(() => getByText('1'))
    expect(text).toBeInTheDocument()
})




