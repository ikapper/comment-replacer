import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Preference from './Preference';
import { DEFAULT_REGEXES } from './Constants';

test('renders the editor for regexes', () => {
    render(<Preference regexes={DEFAULT_REGEXES} isShow={true} />);
    // エスケープ多いが正規表現を探すため仕方ない
    const textareaForRegex = screen.getByDisplayValue(/\^\\s\*#\.\*\$/);
    expect(textareaForRegex).toBeInTheDocument();
});

test('saving valid regexes by clicking save btn', () => {
    const mockSetRegex = jest.fn();
    const mockSetShowOption = jest.fn();
    render(<Preference regexes={DEFAULT_REGEXES} setRegexes={mockSetRegex}
        setShowOption={mockSetShowOption} isShow={true} />);
    const saveBtn = screen.getByText(/保存/);
    userEvent.click(saveBtn);
    expect(mockSetRegex.mock.calls.length).toBe(1);
    expect(mockSetRegex.mock.calls[0][0].length).toBe(2);
    expect(mockSetShowOption.mock.calls.length).toBe(1);
    expect(mockSetShowOption.mock.calls[0][0]).toBe(false);
});

test('close preference without saving', () => {
    const mockSetRegex = jest.fn();
    const mockSetShowOption = jest.fn();
    render(<Preference regexes={DEFAULT_REGEXES} setRegexes={mockSetRegex}
        setShowOption={mockSetShowOption} isShow={true} />);
    // テキストエリアに適当に入力
    const textarea = screen.getByDisplayValue(/\^\\s\*#\.\*\$/);
    userEvent.type(textarea, '\n');
    userEvent.type(textarea, String.raw`invalidregex\ dayo`);
    expect(textarea.value.split('\n').length).toBe(3);

    const closeBtn = screen.getByText(/破棄/);
    userEvent.click(closeBtn);
    // テキストエリアが現在の状態に戻っているか確認
    expect(textarea.value.split('\n').length).toBe(2);
});

test('click preset btns', () => {
    render(<Preference regexes={DEFAULT_REGEXES} isShow={true} />);
    const btnSharp = screen.getByText('#...');
    const btnSlash = screen.getByText('//...');
    const btnMulti = screen.getByText('/*...*/');
    const textarea = screen.getByDisplayValue(/\^\\s\*#\.\*\$/);
    expect(textarea.value.split('\n').length).toBe(2);

    userEvent.click(btnSharp);
    expect(textarea.value.split('\n').length).toBe(4);
    userEvent.click(btnSlash);
    expect(textarea.value.split('\n').length).toBe(6);
    userEvent.click(btnMulti);
    expect(textarea.value.split('\n').length).toBe(7);
});