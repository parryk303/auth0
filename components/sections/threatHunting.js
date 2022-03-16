import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import GaugeChart from 'react-gauge-chart';

export default function ThreatHunting({ ssa, update, setUpdate, threatHuntingQs }) {
    const init = {}
    if (ssa.ThreatHunting.length === 0) {
        threatHuntingQs.map((q, index) => {
            init[index] = 0;
        });
    } else {
        threatHuntingQs.map((q, index) => {
            init[index] = Number(ssa.ThreatHunting[index])
        });
    }
    const [form, setForm] = useState(init)

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
        setUpdate({ ...update, ThreatHunting: [...Object.values(form)] })
    }

    const total = Object.values(form).reduce((p, n) => p + n)
    const ave = Math.round((total / Object.keys(form).length))
    let avePercent = Number(`0.${ave}`)
    if (avePercent === 100) {
        avePercent = 1;
    }

    const getMaturity = (percent) => {
        let maturity = 0;
        if (percent >= 10) {
            maturity = 1
        }
        if (percent >= 30) {
            maturity = 2
        }
        if (percent >= 50) {
            maturity = 3
        }
        if (percent >= 85) {
            maturity = 4
        }
        return maturity;
    }

    const guageStyle = {
        width: '20%',
    }

    return (
        <Container>
            <GaugeChart
                style={guageStyle}
                id='gauge-chart3'
                nrOfLevels={4}
                colors={['#FF4C00', '#FF9E15', '#A2D683']}
                arcWidth={0.4}
                percent={avePercent}
                textColor='#07224C'
                hideText={true}
            />
            <p className='percent'>Maturity: {getMaturity(ave)} Average: {ave}%</p>
            <Grid container
                spacing={3}
                columnSpacing={{ sm: 1 }}
                justifyContent='space-between'
            >
                {threatHuntingQs.map((q, index) => {
                    return (
                        <Grid item xs={12} sm={6} key={index}>
                            <Box sx={{ width: 200 }}>
                                <p>{q}</p>
                                {ssa.ThreatHunting.length === 0 ? (
                                    <Slider
                                        className='slider'
                                        aria-label='Temperature'
                                        defaultValue={0}
                                        color='secondary'
                                        valueLabelDisplay='on'
                                        onChange={handleChange}
                                        name={`${index}`}
                                    />
                                ) : (
                                    <Slider
                                        className='slider'
                                        aria-label='Temperature'
                                        defaultValue={Number(ssa.ThreatHunting[index])}
                                        color='secondary'
                                        valueLabelDisplay='on'
                                        onChange={handleChange}
                                        name={`${index}`}
                                    />
                                )
                                }
                            </Box>
                        </Grid>
                    )
                })}
            </Grid>
        </Container>
    );
};

