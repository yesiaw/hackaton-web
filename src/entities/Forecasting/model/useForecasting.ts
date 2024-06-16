import { useQuery } from '@tanstack/react-query';
import api from '../../../shared/api/api.ts';
import { PAGINATION_TYPE } from '../../../shared/api/types.ts';
export const FORECASTING_KEY = 'forecasting';

export type PredictionResponse = {
    next_page: string;
    previous_page: string | null;
    pages_count: number;
    count: number;
    data: Prediction[];
    metadata: {
        available_areas: string[];
    };
};

export type Prediction = {
    id: number;
    unom: number;
    district: string;
    address: string;
    building_material: string;
    building_assignment: string;
    building_total_area: number;
    area: string;
    project_number: number;
    building_class: string;
    floors_number: number;
    entrances_number: number;
    apartments_number: number;
    heat_supply_volume: number;
    heat_reverse_supply_volume: number;
    backflow_difference: number;
    leakage_difference: number;
    supply_temperature: number;
    return_temperature: number;
    counter_hours: number;
    heat_energy_consumption: number;
    municipal_district: string;
    emergency_status: number;
    total_area: number;
    total_area_lived_spaced: number;
    total_area_unlived_spaced: number;
    depreciation: number;
    wall_material: number;
    freight_elevators_number: number;
    housing_type: number;
    elevators_number: number;
    mkd_status: number;
    occurrence_year: number;
    occurrence_month: number;
    occurrence_day: number;
    predicted_label: string;
    prediction_title: string;
    coordinates: Coordinates;
};

export type Coordinates = {
    latitude: string;
    longitude: string;
};

export const useForecasting = ({
    queryKeys = [],
    params,
    options = {},
}: {
    queryKeys?: any[];
    params: PAGINATION_TYPE & { search: string; area: string };
    options?: {};
}) =>
    useQuery<PredictionResponse>({
        queryKey: [FORECASTING_KEY, ...queryKeys],
        queryFn: () =>
            api.getForecasting({
                page: params.current,
                page_size: params.pageSize,
                address: params.search,
                area: params.area,
            }),
        ...options,
    });
