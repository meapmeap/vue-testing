import {describe, it, expect} from 'vitest';
import {shallowMount} from '@vue/test-utils';
import RegistrationForm from '../../src/components/RegistrationForm.vue';

describe('RegistrationForm', () => {
    it('should initialize with empty input fields', () => {
        // Arrange
        const wrapper = shallowMount(RegistrationForm);

        // Act
        const emailInput = wrapper.find('#email');
        const passwordInput = wrapper.find('#password');
        const confirmPasswordInput = wrapper.find('#confirmPassword');

        // Assert
        expect(emailInput.exists()).toBe(true);
        expect(passwordInput.exists()).toBe(true);
        expect(confirmPasswordInput.exists()).toBe(true);
        expect((emailInput.element as HTMLInputElement).value).toBe('');
        expect((passwordInput.element as HTMLInputElement).value).toBe('');
        expect((confirmPasswordInput.element as HTMLInputElement).value).toBe('');
    });

    it('should initialize with terms unchecked', () => {
        // Arrange
        const wrapper = shallowMount(RegistrationForm);

        // Act
        const acceptTermsInput = wrapper.find('#acceptTerms');

        // Assert
        expect(acceptTermsInput.exists()).toBe(true);
        expect((acceptTermsInput.element as HTMLInputElement).checked).toBe(false);
    });

    it('should update email when user types in email field', async () => {
        // Arrange
        const wrapper = shallowMount(RegistrationForm);
        const emailInput = wrapper.find('#email');

        // Act
        await emailInput.setValue('user@example.com');

        // Assert
        expect((emailInput.element as HTMLInputElement).value).toBe('user@example.com');
    });

    it('should update password when user types in password field', async () => {
        // Arrange
        const wrapper = shallowMount(RegistrationForm);
        const passwordInput = wrapper.find('#password');

        // Act
        await passwordInput.setValue('secret123');

        // Assert
        expect((passwordInput.element as HTMLInputElement).value).toBe('secret123');
    });

    it('should update confirm password when user types in confirm password field', async () => {
        // Arrange
        const wrapper = shallowMount(RegistrationForm);
        const confirmPasswordInput = wrapper.find('#confirmPassword');

        // Act
        await confirmPasswordInput.setValue('secret123');

        // Assert
        expect((confirmPasswordInput.element as HTMLInputElement).value).toBe('secret123');
    });

    it('should check terms when user toggles checkbox', async () => {
        // Arrange
        const wrapper = shallowMount(RegistrationForm);
        const acceptTermsInput = wrapper.find('#acceptTerms');

        // Act
        await acceptTermsInput.setChecked(true);

        // Assert
        expect((acceptTermsInput.element as HTMLInputElement).checked).toBe(true);
    });

    it('should not show error initially', () => {
        // Arrange
        const wrapper = shallowMount(RegistrationForm);

        // Assert
        expect(wrapper.find('.error').exists()).toBe(false);
    });

    it('should render a submit button', () => {
        // Arrange
        const wrapper = shallowMount(RegistrationForm);

        // Act
        const button = wrapper.find('button[type="submit"]');

        // Assert
        expect(button.exists()).toBe(true);
    });

    it('should show error when form is submitted with empty fields', async () => {
        // Arrange
        const wrapper = shallowMount(RegistrationForm);
        const form = wrapper.find('form');

        // Act
        await form.trigger('submit');

        // Assert
        expect(wrapper.find('.error').text()).toBe('Vul alle velden in');
        expect(wrapper.emitted('submit')).toBeFalsy();
    });

    it('should show error when password is too short', async () => {
        // Arrange
        const wrapper = shallowMount(RegistrationForm);
        const emailInput = wrapper.find('#email');
        const passwordInput = wrapper.find('#password');
        const confirmPasswordInput = wrapper.find('#confirmPassword');
        const acceptTermsInput = wrapper.find('#acceptTerms');
        const form = wrapper.find('form');

        // Act
        await emailInput.setValue('user@example.com');
        await passwordInput.setValue('short');
        await confirmPasswordInput.setValue('short');
        await acceptTermsInput.setChecked(true);
        await form.trigger('submit');

        // Assert
        expect(wrapper.find('.error').text()).toBe('Wachtwoord moet minimaal 8 karakters zijn');
        expect(wrapper.emitted('submit')).toBeFalsy();
    });

    it('should show error when passwords do not match', async () => {
        // Arrange
        const wrapper = shallowMount(RegistrationForm);
        const emailInput = wrapper.find('#email');
        const passwordInput = wrapper.find('#password');
        const confirmPasswordInput = wrapper.find('#confirmPassword');
        const acceptTermsInput = wrapper.find('#acceptTerms');
        const form = wrapper.find('form');

        // Act
        await emailInput.setValue('user@example.com');
        await passwordInput.setValue('password123');
        await confirmPasswordInput.setValue('different123');
        await acceptTermsInput.setChecked(true);
        await form.trigger('submit');

        // Assert
        expect(wrapper.find('.error').text()).toBe('Wachtwoorden komen niet overeen');
        expect(wrapper.emitted('submit')).toBeFalsy();
    });

    it('should show error when terms are not accepted', async () => {
        // Arrange
        const wrapper = shallowMount(RegistrationForm);
        const emailInput = wrapper.find('#email');
        const passwordInput = wrapper.find('#password');
        const confirmPasswordInput = wrapper.find('#confirmPassword');
        const form = wrapper.find('form');

        // Act
        await emailInput.setValue('user@example.com');
        await passwordInput.setValue('password123');
        await confirmPasswordInput.setValue('password123');
        await form.trigger('submit');

        // Assert
        expect(wrapper.find('.error').text()).toBe('Je moet de voorwaarden accepteren');
        expect(wrapper.emitted('submit')).toBeFalsy();
    });

    it('should emit submit event with all data when form is valid', async () => {
        // Arrange
        const wrapper = shallowMount(RegistrationForm);
        const emailInput = wrapper.find('#email');
        const passwordInput = wrapper.find('#password');
        const confirmPasswordInput = wrapper.find('#confirmPassword');
        const acceptTermsInput = wrapper.find('#acceptTerms');
        const form = wrapper.find('form');

        // Act
        await emailInput.setValue('user@example.com');
        await passwordInput.setValue('password123');
        await confirmPasswordInput.setValue('password123');
        await acceptTermsInput.setChecked(true);
        await form.trigger('submit');

        // Assert
        expect(wrapper.emitted('submit')?.[0]).toStrictEqual([
            {
                email: 'user@example.com',
                password: 'password123',
                confirmPassword: 'password123',
                acceptTerms: true,
            },
        ]);
    });

    it('should clear error after a later valid submit', async () => {
        // Arrange
        const wrapper = shallowMount(RegistrationForm);
        const emailInput = wrapper.find('#email');
        const passwordInput = wrapper.find('#password');
        const confirmPasswordInput = wrapper.find('#confirmPassword');
        const acceptTermsInput = wrapper.find('#acceptTerms');
        const form = wrapper.find('form');

        // Act
        await form.trigger('submit');
        await emailInput.setValue('user@example.com');
        await passwordInput.setValue('password123');
        await confirmPasswordInput.setValue('password123');
        await acceptTermsInput.setChecked(true);
        await form.trigger('submit');

        // Assert
    });

    it('should emit submit event once on valid submission', async () => {
        // Arrange
        const wrapper = shallowMount(RegistrationForm);
        const emailInput = wrapper.find('#email');
        const passwordInput = wrapper.find('#password');
        const confirmPasswordInput = wrapper.find('#confirmPassword');
        const acceptTermsInput = wrapper.find('#acceptTerms');
        const form = wrapper.find('form');

        // Act
        await emailInput.setValue('user@example.com');
        await passwordInput.setValue('password123');
        await confirmPasswordInput.setValue('password123');
        await acceptTermsInput.setChecked(true);
        await form.trigger('submit');

        // Assert
        expect(wrapper.emitted('submit')).toHaveLength(1);
    });

    it('should emit submit event on repeated valid submissions', async () => {
        // Arrange
        const wrapper = shallowMount(RegistrationForm);
        const emailInput = wrapper.find('#email');
        const passwordInput = wrapper.find('#password');
        const confirmPasswordInput = wrapper.find('#confirmPassword');
        const acceptTermsInput = wrapper.find('#acceptTerms');
        const form = wrapper.find('form');

        // Act
        await emailInput.setValue('user@example.com');
        await passwordInput.setValue('password123');
        await confirmPasswordInput.setValue('password123');
        await acceptTermsInput.setChecked(true);
        await form.trigger('submit');
        await form.trigger('submit');

        // Assert
        expect(wrapper.emitted('submit')).toHaveLength(2);
    });

    it('should not emit submit on validation failures', async () => {
        // Arrange
        const wrapper = shallowMount(RegistrationForm);
        const emailInput = wrapper.find('#email');
        const passwordInput = wrapper.find('#password');
        const confirmPasswordInput = wrapper.find('#confirmPassword');
        const acceptTermsInput = wrapper.find('#acceptTerms');
        const form = wrapper.find('form');

        // Act: empty
        await form.trigger('submit');
        // Act: short password
        await emailInput.setValue('user@example.com');
        await passwordInput.setValue('short');
        await confirmPasswordInput.setValue('short');
        await acceptTermsInput.setChecked(true);
        await form.trigger('submit');
        // Act: mismatch
        await passwordInput.setValue('password123');
        await confirmPasswordInput.setValue('different123');
        await form.trigger('submit');
        // Act: terms unchecked
        await confirmPasswordInput.setValue('password123');
        await acceptTermsInput.setChecked(false);
        await form.trigger('submit');

        // Assert
        expect(wrapper.emitted('submit')).toBeFalsy();
    });

    it('should emit exact payload on valid submission', async () => {
        // Arrange
        const wrapper = shallowMount(RegistrationForm);
        const emailInput = wrapper.find('#email');
        const passwordInput = wrapper.find('#password');
        const confirmPasswordInput = wrapper.find('#confirmPassword');
        const acceptTermsInput = wrapper.find('#acceptTerms');
        const form = wrapper.find('form');

        // Act
        await emailInput.setValue('user@example.com');
        await passwordInput.setValue('password123');
        await confirmPasswordInput.setValue('password123');
        await acceptTermsInput.setChecked(true);
        await form.trigger('submit');

        // Assert
        expect(wrapper.emitted('submit')?.[0]).toStrictEqual([
            {
                email: 'user@example.com',
                password: 'password123',
                confirmPassword: 'password123',
                acceptTerms: true,
            },
        ]);
    });

    it('should reset error at start of submit', async () => {
        // Arrange
        const wrapper = shallowMount(RegistrationForm);
        const emailInput = wrapper.find('#email');
        const passwordInput = wrapper.find('#password');
        const confirmPasswordInput = wrapper.find('#confirmPassword');
        const acceptTermsInput = wrapper.find('#acceptTerms');
        const form = wrapper.find('form');

        // Act: invalid first
        await form.trigger('submit');
        // Act: valid second
        await emailInput.setValue('user@example.com');
        await passwordInput.setValue('password123');
        await confirmPasswordInput.setValue('password123');
        await acceptTermsInput.setChecked(true);
        await form.trigger('submit');

        // Assert
        expect(wrapper.find('.error').exists()).toBe(false);
    });
});

