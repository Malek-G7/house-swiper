import { useState } from "react";

export default function Card(props) {

    const [visible, setVisible] = useState(true);

    if (!visible) return null;

    return (
        <div onClick={() => setVisible(false)}>
            <div >
                <h1>Temporary Card</h1>
                <p>
                    {props.text}
                </p>
                <div ><button >press to hide</button></div>
            </div>
        </div>
    )
}