import {describe, it, expect} from 'vitest';
import {shallowMount} from '@vue/test-utils';
import Counter from '../../src/components/Counter.vue';

describe('Counter', () => {
    it('should start at 0', () => {
        // Arrange
        const wrapper = shallowMount(Counter);

        // Assert
        expect(wrapper.text()).toContain('Count: 0');
    });

    it('should increment count when button is clicked', async () => {
        // Arrange: mount het component
        const wrapper = shallowMount(Counter);

        // Act: simuleer een click op de button
        await wrapper.find('button').trigger('click');

        // Assert: controleer of de count is verhoogd
        expect(wrapper.text()).toContain('Count: 1');
    });

    it('should emit increment event with correct value', async () => {
        // Arrange
        const wrapper = shallowMount(Counter);

        // Act
        await wrapper.find('button').trigger('click');

        // Assert
        expect(wrapper.emitted('increment')?.[0]).toStrictEqual([1]);
    });

    it('should encrement correctly with multiple clicks in succession', async () => {
        // Arrange
        const wrapper = shallowMount(Counter);

        // Act
        await wrapper.find('button').trigger('click');
        await wrapper.find('button').trigger('click');
        await wrapper.find('button').trigger('click');

        // Assert
        expect(wrapper.text()).toContain('Count: 3');

        // Assert
        expect(wrapper.emitted('increment')).toHaveLength(3);
        // Assert
        expect(wrapper.emitted('increment')?.[0]).toStrictEqual([1]);
        expect(wrapper.emitted('increment')?.[1]).toStrictEqual([2]);
        expect(wrapper.emitted('increment')?.[2]).toStrictEqual([3]);
    });
});
