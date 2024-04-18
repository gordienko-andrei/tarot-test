export interface Card {
    name: string;
    id: string;
    category: string;
    image: string;
    meanings: {
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
            combinations: string;
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
            combinations: string;
        }
    };
}



