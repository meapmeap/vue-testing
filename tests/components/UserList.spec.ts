import {describe, it, expect} from 'vitest';
import {shallowMount} from '@vue/test-utils';
import UserList from '../../src/components/UserList.vue';

const users = [
    {id: 1, name: 'Alice', email: 'alice@example.com'},
    {id: 2, name: 'Bob', email: 'bob@example.com'},
    {id: 3, name: 'Charlie', email: 'charlie@example.com'},
];

describe('UserList', () => {
    it('should render all provided users', () => {
        // Arrange
        const wrapper = shallowMount(UserList, {props: {users}});

        // Act
        const userItems = wrapper.findAll('[data-test="user-item"]');

        // Assert
        expect(userItems).toHaveLength(3);
    });

    it('should render each user name and email', () => {
        // Arrange
        const wrapper = shallowMount(UserList, {props: {users}});

        // Act
        const names = wrapper.findAll('[data-test="user-name"]').map((w) => w.text());
        const emails = wrapper.findAll('[data-test="user-email"]').map((w) => w.text());

        // Assert
        expect(names).toEqual(['Alice', 'Bob', 'Charlie']);
        expect(emails).toEqual(['alice@example.com', 'bob@example.com', 'charlie@example.com']);
    });

    it('should display the first user as the first item', () => {
        // Arrange
        const wrapper = shallowMount(UserList, {props: {users}});

        // Act
        const firstUserName = wrapper.findAll('[data-test="user-name"]')[0]?.text();

        // Assert
        expect(firstUserName).toBe(users[0].name);
    });

    it('should display the first user email as the first item', () => {
        // Arrange
        const wrapper = shallowMount(UserList, {props: {users}});

        // Act
        const firstUserEmail = wrapper.findAll('[data-test="user-email"]')[0]?.text();

        // Assert
        expect(firstUserEmail).toBe(users[0].email);
    });

    it('should show empty state when no users', () => {
        // Arrange
        const wrapper = shallowMount(UserList, {props: {users: []}});

        // Assert
        expect(wrapper.getByDataTest('empty-state').exists()).toBe(true);
        expect(wrapper.getByDataTest('empty-state').text()).toBe('No users found');
        expect(wrapper.find('[data-test="user-list"]').exists()).toBe(false);
    });

    it('should show user list when users exist', () => {
        // Arrange
        const wrapper = shallowMount(UserList, {props: {users}});

        // Assert
        expect(wrapper.getByDataTest('user-list').exists()).toBe(true);
        expect(wrapper.find('[data-test="empty-state"]').exists()).toBe(false);
    });

    it('should render zero user items for empty list', () => {
        // Arrange
        const wrapper = shallowMount(UserList, {props: {users: []}});

        // Act
        const userItems = wrapper.findAll('[data-test="user-item"]');

        // Assert
        expect(userItems).toHaveLength(0);
    });

    it('should not show the empty state when the users array is not empty', () => {
        // Arrange
        const wrapper = shallowMount(UserList, {props: {users}});

        // Assert
        expect(wrapper.find('[data-test="empty-state"]').exists()).toBe(false);
    });

    it('should render a delete button for each user', () => {
        // Arrange
        const wrapper = shallowMount(UserList, {props: {users}});

        // Act
        const deleteButtons = wrapper.findAll('[data-test="delete-button"]');

        // Assert
        expect(deleteButtons).toHaveLength(users.length);
    });

    it('should emit delete event with the user id when delete button is clicked', async () => {
        // Arrange
        const wrapper = shallowMount(UserList, {props: {users}});

        // Act
        await wrapper.findAll('[data-test="delete-button"]')[0].trigger('click');

        // Assert
        expect(wrapper.emitted('delete')?.[0]).toStrictEqual([users[0].id]);
    });
});
