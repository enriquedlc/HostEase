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
        const startDate = new Date(event.startDate);
        const startMonth = startDate.getMonth();

        if (startDate.getFullYear() === currentDate.getFullYear()) {
            const diffMonths = currentDate.getMonth() - startMonth;

            if (diffMonths >= 0 && diffMonths < 7) {
                months[diffMonths] += 1;
            }
        }
    });

    return months;
}

export function getCommentsByMonth(messages: Message[]): number[] {
    const months = Array(7).fill(0);
  
    messages.forEach((message) => {
      const publishedDate = new Date(message.publishedAt);
      const monthIndex = publishedDate.getMonth();
  
      if (monthIndex >= 0 && monthIndex < 7) {
        months[monthIndex] += 1;
      }
    });
  
    return months;
  }
  

