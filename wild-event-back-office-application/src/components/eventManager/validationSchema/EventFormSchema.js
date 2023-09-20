import * as yup from "yup";

const yupTextField = yup
    .string()
    .min(5, "Too Short!")
    .max(100, "Too Long!")
    .required("This field is required!");

const customDateFormat = "YYYY-MM-DDTHH:mm:ss";

const customDateValidator = (value) => {
    if (!yup.string().matches(new RegExp(`^${customDateFormat}$`)).isValidSync(value)) {
        return `Date must be in the format ${customDateFormat}`;
    }
}

const basicSchema = yup.object().shape({
    title: yupTextField,
    description: yupTextField,
    dateRange: yup.object().shape({
        startsAt: yup.string().test("date-format", "Invalid date format", customDateValidator),
        endsAt: yup.string().test("date-format", "Invalid date format", customDateValidator),
    }),
    locationId: yup.string().required("This field is required!"),
    organizers: yup.array().of(yup.string()).min(1, "At least one organizer is required!"),
    openToPublic: yup.boolean(),
});


export default basicSchema;