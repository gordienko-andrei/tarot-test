export interface Card {
    name: string;
    id: string;
    category: string;
    isRotated: boolean;
    image: string;
    meanings: {
        daily: string;
        bottom_of_deck: string,
        upright: {
            general: string;
            love: string;
            work: string;
            friendship: string;
            personal_state: string;
            deeper_meaning: string;
            finance_home: string;
            personal_relationships: string;
            health: string;
            partner_analysis: string;
        };
        reversed: {
            general: string;
            love: string;
            work: string;
            friendship: string;
            personal_state: string;
            deeper_meaning: string;
            finance_home: string;
            personal_relationships: string;
            health: string;
            partner_analysis: string;
        }
    };
}



