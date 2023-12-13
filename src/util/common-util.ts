import { parse, format } from 'date-fns';

class CommonUtil {
    public static asSqlDate(dateString: string): Date {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            throw new Error('Invalid date format');
        }
        return date;
    }

    public static getSqlDate(): Date {
        return new Date();
    }    

    public static getDate(date: string, expectedFormat: string): string {
        const parsedDate = parse(date, 'yyyy-MM-dd', new Date());
        return format(parsedDate, expectedFormat);
    }
}

export default CommonUtil;