import {InputGroup, Form} from "react-bootstrap";

interface DatepickerProps {
    selectedValue: string;
    minDate: string;
    onChange: (newDate: string) => void;
}

export function CustomDatepicker( props: DatepickerProps ) {
    const {selectedValue, minDate, onChange} = props

    return (
        <div className="custom-datepicker">
            <InputGroup>
                <Form.Control
                    type="date"
                    value={selectedValue}
                    onChange={(e) => onChange(e.target.value)}
                    min={minDate}
                />
            </InputGroup>
        </div>
    )

}
