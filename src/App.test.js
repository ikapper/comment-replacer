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