import { User } from "../Types/Types";

// this function is to set the x axis chart
export function getLastMonths(): string[] {
    const currentDate = new Date();
    const categories: string[] = [];

    for (let i = 0; i < 8; i++) {
        const month = currentDate.getMonth() - i;
        const year = currentDate.getFullYear();
        const date = new Date(year, month, 1).toISOString();
        categories.push(date);
    }

    return categories;
}

// this function is to set the y axis chart
export function getUsersByMonth(users: User[]): number[] {
    const currentDate = new Date();
    const months: number[] = Array(8).fill(0); // Inicializar el array con ceros para cada mes

    users.forEach((user) => {
        const joinedDate = new Date(user.joinedAt);
        const joinedMonth = joinedDate.getMonth();

        if (joinedDate.getFullYear() === currentDate.getFullYear()) {
            const diffMonths = currentDate.getMonth() - joinedMonth;

            if (diffMonths < 12) {
                months[diffMonths] += 1; // Incrementar el contador para el mes correspondiente
            }
        }
    });

    return months;
}
