import {describe, it, expect} from 'vitest';
import {shallowMount} from '@vue/test-utils';
import LoginForm from '../../src/components/LoginForm.vue';

describe('LoginForm', () => {
    it('should update email when user types in email field', async () => {
        // Arrange
        const wrapper = shallowMount(LoginForm);
        const emailInput = wrapper.find('#email');

        // Act
        await emailInput.setValue('test@example.com');

        // Assert
        expect((emailInput.element as HTMLInputElement).value).toBe('test@example.com');
    });

    it('should update password when user types in password field', async () => {
        // Arrange
        const wrapper = shallowMount(LoginForm);
        const passwordInput = wrapper.find('#password');

        // Act
        await passwordInput.setValue('secret123');

        // Assert
        expect((passwordInput.element as HTMLInputElement).value).toBe('secret123');
    });

    it('should initialize with empty input fields', () => {
        // Arrange
        const wrapper = shallowMount(LoginForm);

        // Act
        const emailInput = wrapper.find('#email');
        const passwordInput = wrapper.find('#password');

        // Assert
        expect(emailInput.exists()).toBe(true);
        expect(passwordInput.exists()).toBe(true);
        expect((emailInput.element as HTMLInputElement).value).toBe('');
        expect((passwordInput.element as HTMLInputElement).value).toBe('');
    });

    it('should emit submit event with email and password when form is submitted', async () => {
        // Arrange
        const wrapper = shallowMount(LoginForm);
        const emailInput = wrapper.find('#email');
        const passwordInput = wrapper.find('#password');
        const form = wrapper.find('form');

        // Act
        await emailInput.setValue('user@example.com');
        await passwordInput.setValue('secret123');
        await form.trigger('submit');

        // Assert
        expect(wrapper.emitted('submit')?.[0]).toStrictEqual([
            {email: 'user@example.com', password: 'secret123'},
        ]);
    });

    it('should show error when form is submitted with empty fields', async () => {
        // Arrange
        const wrapper = shallowMount(LoginForm);
        const form = wrapper.find('form');

        // Act
        await form.trigger('submit');

        // Assert
        expect(wrapper.find('.error').text()).toBe('Vul alle velden in');
        expect(wrapper.emitted('submit')).toBeFalsy();
    });


    it('should show error when form is submitted with only email filled', async () => {
        // Arrange
        const wrapper = shallowMount(LoginForm);
        const emailInput = wrapper.find('#email');
        const form = wrapper.find('form');
        await form.trigger('submit');

        // Assert
        expect(wrapper.find('.error').text()).toBe('Vul alle velden in');
        expect(wrapper.emitted('submit')).toBeFalsy();
    });

    it('should show error when form is submitted with only password filled', async () => {
        // Arrange
        const wrapper = shallowMount(LoginForm);
        const passwordInput = wrapper.find('#password');
        const form = wrapper.find('form');

        // Act
        await passwordInput.setValue('secret123');
        await form.trigger('submit');

        // Assert
        expect(wrapper.find('.error').text()).toBe('Vul alle velden in');
        expect(wrapper.emitted('submit')).toBeFalsy();
    });

    it('should clear error after a later valid submit', async () => {
        // Arrange
        const wrapper = shallowMount(LoginForm);
        const emailInput = wrapper.find('#email');
        const passwordInput = wrapper.find('#password');
        const form = wrapper.find('form');

        // Act
        await form.trigger('submit');
        await emailInput.setValue('user@example.com');
        await passwordInput.setValue('secret123');
        await form.trigger('submit');

        // Assert
        expect(wrapper.find('.error').exists()).toBe(false);
        expect(wrapper.emitted('submit')?.[0]).toStrictEqual([
            {email: 'user@example.com', password: 'secret123'},
        ]);
    });

    it('should show error on a later invalid submit', async () => {
        // Arrange
        const wrapper = shallowMount(LoginForm);
        const emailInput = wrapper.find('#email');
        const passwordInput = wrapper.find('#password');
        const form = wrapper.find('form');

        // Act
        await emailInput.setValue('user@example.com');
        await passwordInput.setValue('secret123');
        await form.trigger('submit');
        await emailInput.setValue('');
        await form.trigger('submit');

        // Assert
        expect(wrapper.find('.error').text()).toBe('Vul alle velden in');
    });

    it('should emit one event per submit', async () => {
        // Arrange
        const wrapper = shallowMount(LoginForm);
        const emailInput = wrapper.find('#email');
        const passwordInput = wrapper.find('#password');
        const form = wrapper.find('form');

        // Act
        await emailInput.setValue('user@example.com');
        await passwordInput.setValue('secret123');
        await form.trigger('submit');
        await form.trigger('submit');

        // Assert
        expect(wrapper.emitted('submit')).toHaveLength(2);
        expect(wrapper.emitted('submit')?.[0]).toStrictEqual([
            {email: 'user@example.com', password: 'secret123'},
        ]);
        expect(wrapper.emitted('submit')?.[1]).toStrictEqual([
            {email: 'user@example.com', password: 'secret123'},
        ]);
    });

    it('should render a submit button', () => {
        // Arrange
        const wrapper = shallowMount(LoginForm);

        // Act
        const button = wrapper.find('button[type="submit"]');

        // Assert
        expect(button.exists()).toBe(true);
    });
});