import fetch from 'isomorphic-unfetch';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Confirm, Loader } from 'semantic-ui-react';

import GaugeChart from 'react-gauge-chart';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const Ssa = ({ ssa }) => {

    const [confirm, setConfirm] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();

    const average = arr => arr.reduce((a, b) => a + b, 0) / arr.length;
    let arr = Object.values(ssa)
    const values = arr.slice(2, 23)

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

    const ssaAves = {
        'Next Generation SOC': getMaturity(Math.round(average(values[0].map(Number)))),
        'SOC KPI': getMaturity(Math.round(average(values[1].map(Number)))),
        'Utilization & Normalization': getMaturity(Math.round(average(values[2].map(Number)))),
        'Use Case': getMaturity(Math.round(average(values[3].map(Number)))),
        'Enrichment': getMaturity(Math.round(average(values[4].map(Number)))),
        'Insider Threat Profile': getMaturity(Math.round(average(values[5].map(Number)))),
        'Threat Hunting': getMaturity(Math.round(average(values[6].map(Number)))),
        'Vulnerability Management': getMaturity(Math.round(average(values[7].map(Number)))),
        'Threat Intelligence': getMaturity(Math.round(average(values[8].map(Number)))),
        'Data Masking': getMaturity(Math.round(average(values[9].map(Number)))),
        'SOAR': getMaturity(Math.round(average(values[10].map(Number)))),
        'Process': getMaturity(Math.round(average(values[11].map(Number)))),
        'SOC Staff': getMaturity(Math.round(average(values[12].map(Number)))),
        'Training Accredidation': getMaturity(Math.round(average(values[13].map(Number)))),
        'DFIR': getMaturity(Math.round(average(values[14].map(Number)))),
        'Fraud Prevention': getMaturity(Math.round(average(values[15].map(Number)))),
        'Red, Blue & Purple Teams': getMaturity(Math.round(average(values[16].map(Number)))),
        'Security Mangement': getMaturity(Math.round(average(values[17].map(Number)))),
        'Risk': getMaturity(Math.round(average(values[18].map(Number)))),
        'On Call': getMaturity(Math.round(average(values[19].map(Number)))),
        'Physical Security': getMaturity(Math.round(average(values[20].map(Number))))
    }

    const titles = Object.keys(ssaAves);
    const total = Object.values(ssaAves)
    const totalAve = Math.round(average(total));

    useEffect(() => {
        const deleteSSA = async () => {
            const ssaId = router.query.id;
            try {
                const deleted = await fetch(`/api/collection/${ssaId}`, {
                    method: 'Delete'
                });
                router.push('/collection');
            } catch (error) {
                console.log(error)
            }
        }
        if (isDeleting) {
            deleteSSA();
        }
    }, [isDeleting, router])

    const open = () => setConfirm(true);

    const close = () => setConfirm(false);

    const handleDelete = async () => {
        setIsDeleting(true);
        close();
    }

  
    const guageStyle = {
        width: '75%',
    }

    return (
        <>
            <h1>{ssa.title}</h1><h5>Average Maturity: {totalAve}</h5><Button size='large' onClick={handleDelete}>Delete</Button>
            {isDeleting
                ? <Loader active />
                :
                <div className='grid-container'>
                    {values.map((section, index) => {
                        const ave = Math.round(average(values[index].map(Number)))
                        if (ave === 1) ave = 100
                        return (
                            <div className='grid-item' key={titles[index]}>
                                <h5 className='consoleTitle'>{titles[index]}</h5>
                                {ave ? (
                                    <Box sx={{ width: 200 }}>
                                        
                                        <GaugeChart
                                            className='chart'
                                            style={guageStyle}
                                            id='gauge-chart3'
                                            nrOfLevels={4}
                                            colors={['#FF4C00', '#FF9E15', '#A2D683']}
                                            arcWidth={0.4}
                                            percent={ave / 100}
                                            textColor='#07224C'
                                            hideText={true}
                                        />
                                        <p className='percent'> Maturity: {getMaturity(ave)}</p>
                                        <p className='percent'> Average: {ave}%</p>
                                    </Box>
                                ) : <p className='incomplete'>incomplete</p>
                                }
                            </div>
                        )
                    })}
                </div>
            }
            <Confirm
                open={confirm}
                onCancel={close}
                onConfirm={handleDelete} />
        </>
    )
}

Ssa.getInitialProps = async ({ query: { id } }) => {
    const res = await fetch(`${process.env.AUTH0_BASE_URL}/api/collection/${id}`);
    const { data } = await res.json();
    return { ssa: data }
}

export default Ssa;

