import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test('renders app title', () => {
    render(<App />);
    const linkElement = screen.getByText(/ツール/i);
    expect(linkElement).toBeInTheDocument();
});

test('input text', () => {
    render(<App />);
    const inputTextarea = screen.getByDisplayValue(/some code here/);
    const outputTextarea = screen.getByDisplayValue(/result here/);

    userEvent.type(inputTextarea, '\na = 0;\n');
    userEvent.type(inputTextarea, '# comment!\n');
    userEvent.type(inputTextarea, 'a += 12;\n');
    userEvent.type(inputTextarea, 'print(f"a: {a}");');

    expect(outputTextarea.value.includes('comment')).toBe(false);
    expect(outputTextarea.value.includes('print(')).toBe(true);
    expect(outputTextarea.value.includes('a = 0;')).toBe(true);
});

test('type output textarea', () => {
    render(<App />);
    const inputTextarea = screen.getByDisplayValue(/some code here/);
    const outputTextarea = screen.getByDisplayValue(/result here/);

    userEvent.type(inputTextarea, '\na=12');
    expect(outputTextarea.value.includes('result')).toBe(false);
    userEvent.type(outputTextarea, '\n//this is msg added after replacing');
    expect(inputTextarea.value.includes('a=12')).toBe(true);
    expect(inputTextarea.value.includes('replacing')).toBe(false);
    expect(outputTextarea.value.includes('replacing')).toBe(true);
});

test('add substitution string and input text', () => {
    render(<App />);
    const substitutionStringInput = screen.getByPlaceholderText(/ここに置換先テキストを/);
    const inputTextarea = screen.getByDisplayValue(/some code here/);
    const outputTextarea = screen.getByDisplayValue(/result here/);

    userEvent.type(substitutionStringInput, 'helloworld');
    userEvent.type(inputTextarea, '\n# comment!');

    expect(outputTextarea.value.includes('comment')).toBe(false);
    expect(outputTextarea.value.includes('helloworld')).toBe(true);
});

test('give effect to result immediately by changing substitution string', () => {
    render(<App />);
    const substitutionStringInput = screen.getByPlaceholderText(/ここに置換先テキストを/);
    const inputTextarea = screen.getByDisplayValue(/some code here/);
    const outputTextarea = screen.getByDisplayValue(/result here/);

    userEvent.type(inputTextarea, '\n# to be replaced!');
    expect(outputTextarea.value.includes('replaced!')).toBe(false);
    expect(outputTextarea.value.includes('substitution here')).toBe(false);

    userEvent.type(substitutionStringInput, 'substitution here!');
    expect(outputTextarea.value.includes('substitution here')).toBe(true);
});

test('give effect to result immediately by changing regexes', () => {
    render(<App />);
    const inputTextarea = screen.getByDisplayValue(/some code here/);
    const outputTextarea = screen.getByDisplayValue(/result here/);
    const prefBtn = screen.getByText(/設定/);
    const regexInputTextarea = screen.getByDisplayValue(/\*\$/);
    const saveBtn = screen.getByText(/保存/);

    userEvent.type(inputTextarea, '\nwill be removed\n');
    userEvent.click(prefBtn);
    userEvent.type(regexInputTextarea, '\n^will');
    expect(outputTextarea.value.includes('will')).toBe(true);
    userEvent.click(saveBtn);
    expect(outputTextarea.value.includes('will')).toBe(false);
});
