import { useState } from "react";

function Converter() {

    const [rgbValue, setRgb] = useState({
        value: "",
        className: 'form',
        bgColor: { backgroundColor: ' rgb(40, 58, 91)' },
    });

    const handleShowParams = ({ target }) => {

        const { value } = target;

        //валидация на hex

        const validHex = new RegExp('^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$');

        // Если меньше 7 символов - ничего не происходит

        if (value.length < 7) {
            return
        }

        // Если валидация верная и нужно покрасить экран

        if (validHex.test(value)) {

            //Преобразование hex в rhb
            let hex = value.slice(1);

            let aRgbHex = hex.match(/.{1,2}/g);
            let aRgb = [
                parseInt(aRgbHex[0], 16),
                parseInt(aRgbHex[1], 16),
                parseInt(aRgbHex[2], 16)
            ];
            let Rgb = ('rgb(' + aRgb[0] + ',' + aRgb[1] + ',' + aRgb[2] + ')');

            // Вставить RGB и окрасить фон в этот цвет
            setRgb({
                value: Rgb,
                className: 'form',
                bgColor: { backgroundColor: Rgb },
            });
        }

        else {

            //Вставить сообщение об ошибке во второе поле и окрасить фон в красный
            setRgb({
                value: 'Ошибка!',
                className: 'form',
                bgColor: { backgroundColor: 'rgb(220, 20, 60)' },
            });
        }
    };

    return (
        <form className={rgbValue.className} style={rgbValue.bgColor}>
            <div className="wrapper_hex">
                <label htmlFor="hex"></label>
                <input id="hex" className='HEX' type="text" onChange={handleShowParams} placeholder="HEX" />
            </div>
            <div className="wrapper_rgb">
                <label htmlFor="rgb"></label>
                <input id="rgb" className='RGB' type="text" value={rgbValue.value} placeholder="RGB" disabled />
            </div>
        </form>
    )
}

export default Converter;