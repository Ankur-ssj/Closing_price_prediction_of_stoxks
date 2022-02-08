import React, {useEffect, useState} from 'react'
import '../scss/result.css'
import google from '../images/google.png'
import { Backdrop, CircularProgress } from '@mui/material';

const Results = () => {

    const [data, setData] = useState([])

    const getData = async () =>{
        const response  = await fetch('/api');
        setData(await response.json());
        console.log(data);
    }

    useEffect(()=> {
        getData();
    }, []);

    function Person(first, last, age, gender, interests) {
        this.name = {
           first : first,
           last : last
        };
        this.age = age;
        this.gender = gender;
        this.interests = interests;
        this.bio = function() {
          alert(this.name.first + ' ' + this.name.last + ' is ' + this.age + ' years old. He likes ' + this.interests[0] + ' and ' + this.interests[1] + '.');
        };
        this.greeting = function() {
          alert('Hi! I\'m ' + this.name.first + '.');
        };
      }

      let personOne = new Person("Ankur",  "Sinha", "22", "male", "Coding")
      console.log(personOne)

    return (
        <div className="google-value">
            <div className="predicted_price">
                <div className="predicted_price_header">Predicted Price</div>
                <div className="value">{data.data?data.data : <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open>
                    <CircularProgress color="inherit" />
                    </Backdrop>}</div>
            </div>
            <div className="actual_price">
                <div className="actual_price_header">Actual Price</div>
                <div className="value_two">{data.real_price_value?data.real_price_value : <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open>
                    <CircularProgress color="inherit" />
                    </Backdrop>}
                </div>
            </div>
            <img src={google} alt="google graph" className="google-graph"/>
        </div>
    )
}

export default Results
