import * as yup from "yup";
import dayjs from 'dayjs';

const customDateFormat = "YYYY-MM-DDTHH:mm:ss";


const basicSchema = yup.object().shape({
    title: yup.string().min(5, "Too Short!").max(100, "Too Long!").required("This field is required!"),
    description: yup.string().min(5, "Too Short!").max(500, "Too Long!").required("This field is required!"),
    // dateRange: yup.object().shape({
    //     startsAt: yup.date()
    //         .test('date-future', 'Start date cannot be in the past', (value) => {
                
    //             const currentDate = dayjs();
    //             const startDate = dayjs(value);
    //             return startDate >= currentDate;
    //         }),
    //     endsAt: yup.date()
    //         .test('date-future', 'End date cannot be in the past', (value) => {
    //             const currentDate = dayjs();
    //             const endDate = dayjs(value);
    //             return endDate >= currentDate;
    //         })
    //         .test('date-range', 'End date must be after start date', function (value) {
    //             const { startsAt } = this.parent;
    //             if (startsAt && value) {
    //                 return dayjs(value).isAfter(dayjs(startsAt));
    //             }
    //             return true;
    //         }),
    // }),
    
    locationId: yup.string().required("This field is required!"),
    organizers: yup.array().of(yup.string()).min(1, "At least one organizer is required!"),
    openToPublic: yup.boolean(),
});

export default basicSchema;
