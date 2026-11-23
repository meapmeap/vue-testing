import {describe, it, expect, vi, beforeEach} from 'vitest';
import {shallowMount, flushPromises} from '@vue/test-utils';
import WeatherWidget from '../../src/components/WeatherWidget.vue';
import {fetchWeather} from '../../src/helpers/fetchWeather';

vi.mock('../../src/helpers/fetchWeather', () => ({
    fetchWeather: vi.fn(),
}));

describe('WeatherWidget', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should show loading state while the weather API call is pending', async () => {
        // Arrange: fetchWeather geeft een pending promise terug
        let resolveFetch!: (value: {temperature: number; description: string}) => void;
        const pending = new Promise<{temperature: number; description: string}>((resolve) => {
            resolveFetch = resolve;
        });
        (fetchWeather as ReturnType<typeof vi.fn>).mockReturnValue(pending);

        // Act
        const wrapper = shallowMount(WeatherWidget, {props: {city: 'Amsterdam'}});

        // Assert: tijdens de call is loading zichtbaar
        expect(wrapper.find('.loading').exists()).toBe(true);
        expect(wrapper.text()).toContain('Loading weather...');

        // Cleanup: resolve en flush
        resolveFetch({temperature: 20, description: 'Sunny'});
        await flushPromises();
        expect(wrapper.find('.loading').exists()).toBe(false);
    });
    
    it('should render weather data after a successful fetch', async () => {
        // Arrange
        (fetchWeather as ReturnType<typeof vi.fn>).mockResolvedValue({temperature: 21, description: 'Sunny'});

        // Act
        const wrapper = shallowMount(WeatherWidget, {props: {city: 'Amsterdam'}});
        await flushPromises();

        // Assert
        expect(wrapper.find('.weather-data').exists()).toBe(true);
        expect(wrapper.find('.temperature').text()).toBe('21°C');
        expect(wrapper.find('.description').text()).toBe('Sunny');
        expect(wrapper.find('.loading').exists()).toBe(false);
        expect(wrapper.find('.error').exists()).toBe(false);
    });

    it('should show error state when fetch fails', async () => {
        // Arrange
        (fetchWeather as ReturnType<typeof vi.fn>).mockRejectedValue(new Error('Network error'));

        // Act
        const wrapper = shallowMount(WeatherWidget, {props: {city: 'Amsterdam'}});
        await flushPromises();

        // Assert
        expect(wrapper.find('.error').exists()).toBe(true);
        expect(wrapper.text()).toContain('Network error');
        expect(wrapper.find('.loading').exists()).toBe(false);
        expect(wrapper.find('.weather-data').exists()).toBe(false);
    });

    it('should show empty state when no weather data is available', async () => {
        // Arrange
        (fetchWeather as ReturnType<typeof vi.fn>).mockResolvedValue(null as any);

        // Act
        const wrapper = shallowMount(WeatherWidget, {props: {city: 'Amsterdam'}});
        await flushPromises();

        // Assert
        expect(wrapper.find('.empty').exists()).toBe(true);
        expect(wrapper.text()).toContain('No weather data available');
    });

    it('should display the city name in the heading', async () => {
        // Arrange
        (fetchWeather as ReturnType<typeof vi.fn>).mockResolvedValue({temperature: 21, description: 'Sunny'});

        // Act
        const wrapper = shallowMount(WeatherWidget, {props: {city: 'Amsterdam'}});

        // Assert
        expect(wrapper.find('h3').text()).toContain('Amsterdam');
    });

    it('should call fetchWeather with the provided city', async () => {
        // Arrange
        (fetchWeather as ReturnType<typeof vi.fn>).mockResolvedValue({temperature: 21, description: 'Sunny'});

        // Act
        shallowMount(WeatherWidget, {props: {city: 'Rotterdam'}});

        // Assert
        expect(fetchWeather).toHaveBeenCalledWith('Rotterdam');
    });

    it('should show fallback error message when a non-Error is thrown', async () => {
        // Arrange
        (fetchWeather as ReturnType<typeof vi.fn>).mockRejectedValue('boom');

        // Act
        const wrapper = shallowMount(WeatherWidget, {props: {city: 'Amsterdam'}});
        await flushPromises();

        // Assert
        expect(wrapper.find('.error').exists()).toBe(true);
        expect(wrapper.text()).toContain('Failed to fetch weather');
    });

    it('should still render weather data when only temperature is present', async () => {
        // Arrange
        (fetchWeather as ReturnType<typeof vi.fn>).mockResolvedValue({temperature: 18} as any);

        // Act
        const wrapper = shallowMount(WeatherWidget, {props: {city: 'Amsterdam'}});
        await flushPromises();

        // Assert
        expect(wrapper.find('.weather-data').exists()).toBe(true);
        expect(wrapper.find('.temperature').text()).toBe('18°C');
        expect(wrapper.find('.description').text()).toBe('');
    });

    it('should still render weather data when only description is present', async () => {
        // Arrange
        (fetchWeather as ReturnType<typeof vi.fn>).mockResolvedValue({description: 'Rainy'} as any);

        // Act
        const wrapper = shallowMount(WeatherWidget, {props: {city: 'Amsterdam'}});
        await flushPromises();

        // Assert
        expect(wrapper.find('.weather-data').exists()).toBe(true);
        expect(wrapper.find('.description').text()).toBe('Rainy');
        expect(wrapper.find('.temperature').text()).toBe('°C');
    });

    it('should display the temperature in the temperature element', async () => {
        // Arrange
        (fetchWeather as ReturnType<typeof vi.fn>).mockResolvedValue({temperature: 17, description: 'Cloudy'});

        // Act
        const wrapper = shallowMount(WeatherWidget, {props: {city: 'Amsterdam'}});
        await flushPromises();

        // Assert
        expect(wrapper.find('.temperature').text()).toBe('17°C');
    });

    it('should display the description in the description element', async () => {
        // Arrange
        (fetchWeather as ReturnType<typeof vi.fn>).mockResolvedValue({temperature: 17, description: 'Cloudy'});

        // Act
        const wrapper = shallowMount(WeatherWidget, {props: {city: 'Amsterdam'}});
        await flushPromises();

        // Assert
        expect(wrapper.find('.description').text()).toBe('Cloudy');
    });
});
