import {describe, it, expect, vi} from 'vitest';
import {shallowMount} from '@vue/test-utils';
import SearchForm from '../../src/components/SearchForm.vue';

describe('SearchForm', () => {
    it('should call onSubmit when form is submitted with a non-empty query', async () => {
        // Arrange
        const onSubmit = vi.fn();
        const wrapper = shallowMount(SearchForm, {props: {onSubmit}});
        const input = wrapper.find('[data-test="search-input"]');
        const form = wrapper.find('form');

        // Act
        await input.setValue('vue testing');
        await form.trigger('submit');

        // Assert
        expect(onSubmit).toHaveBeenCalled();
    });

    it('should pass the entered query to onSubmit', async () => {
        // Arrange
        const onSubmit = vi.fn();
        const wrapper = shallowMount(SearchForm, {props: {onSubmit}});
        const input = wrapper.find('[data-test="search-input"]');
        const form = wrapper.find('form');

        // Act
        await input.setValue('vue testing');
        await form.trigger('submit');

        // Assert
        expect(onSubmit).toHaveBeenCalledWith('vue testing');
    });

    it('should call onSubmit exactly once per submit', async () => {
        // Arrange
        const onSubmit = vi.fn();
        const wrapper = shallowMount(SearchForm, {props: {onSubmit}});
        const input = wrapper.find('[data-test="search-input"]');
        const form = wrapper.find('form');

        // Act
        await input.setValue('vue testing');
        await form.trigger('submit');

        // Assert
        expect(onSubmit).toHaveBeenCalledTimes(1);
    });

    it('should not call onSubmit when query is empty', async () => {
        // Arrange
        const onSubmit = vi.fn();
        const wrapper = shallowMount(SearchForm, {props: {onSubmit}});
        const form = wrapper.find('form');

        // Act
        await form.trigger('submit');

        // Assert
        expect(onSubmit).not.toHaveBeenCalled();
    });

    it('should not call onSubmit when query is only whitespace', async () => {
        // Arrange
        const onSubmit = vi.fn();
        const wrapper = shallowMount(SearchForm, {props: {onSubmit}});
        const input = wrapper.find('[data-test="search-input"]');
        const form = wrapper.find('form');

        // Act
        await input.setValue('   ');
        await form.trigger('submit');

        // Assert
        expect(onSubmit).not.toHaveBeenCalled();
    });

    it('should emit search event with query as payload', async () => {
        // Arrange
        const onSubmit = vi.fn();
        const wrapper = shallowMount(SearchForm, {props: {onSubmit}});
        const input = wrapper.find('[data-test="search-input"]');
        const form = wrapper.find('form');

        // Act
        await input.setValue('vue testing');
        await form.trigger('submit');

        // Assert
        expect(wrapper.emitted('search')?.[0]).toStrictEqual(['vue testing']);
    });

    it('should not emit search when query is empty', async () => {
        // Arrange
        const onSubmit = vi.fn();
        const wrapper = shallowMount(SearchForm, {props: {onSubmit}});
        const form = wrapper.find('form');

        // Act
        await form.trigger('submit');

        // Assert
        expect(wrapper.emitted('search')).toBeFalsy();
    });
});
