import { HostEaseEvent, Message, User } from "../Types/Types";

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
    const months: number[] = Array(8).fill(0);

    users.forEach((user) => {
        const joinedDate = new Date(user.joinedAt);
        const joinedMonth = joinedDate.getMonth();

        if (joinedDate.getFullYear() === currentDate.getFullYear()) {
            const diffMonths = currentDate.getMonth() - joinedMonth;

            if (diffMonths < 12) {
                months[diffMonths] += 1;
            }
        }
    });

    return months;
}

export function getEventsByMonth(events: HostEaseEvent[]): number[] {
    const currentDate = new Date();
    const months: number[] = Array(8).fill(0);

    events.forEach((event) => {
        const startDate = event.startDate;
        const startMonth = startDate?.substring(3, 5);

        if (startDate?.substring(6, 10) === currentDate.getFullYear().toString()) {
            const diffMonths = parseInt(currentDate.getMonth().toString()) - parseInt(startMonth!);

            if (diffMonths < 12) {
                months[diffMonths] += 1;
            }
        }
    });

    return months;
}

export function getCommentsByMonth(messages: Message[]): number[] {
    const currentDate = new Date();
    const months = Array(8).fill(0);

    messages.forEach((message) => {
        const publishedDate = new Date(message.publishedAt);
        const publishedMonth = publishedDate.getMonth();

        if (publishedDate.getFullYear() === currentDate.getFullYear()) {
            const diffMonths = currentDate.getMonth() - publishedMonth;

            if (diffMonths < 12) {
                months[diffMonths] += 1;
            }
        }
    });

    return months;
}

export function calculateChartBarValue(array: number[]): number {
    if (array.length < 2) {
        throw new Error('El array debe tener al menos dos elementos.');
    }

    const position0 = array[0];
    const position1 = array[1];

    if (position1 === 0) {
        return 0;
    }

    const percentage = (position0 / position1) * 100;

    return parseFloat(percentage.toFixed(1));
}


