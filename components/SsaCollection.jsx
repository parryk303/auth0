
import Link from 'next/link';
import FeedIcon from '@mui/icons-material/Feed';
import Button from '@mui/material/Button';
import GaugeChart from 'react-gauge-chart';

const SsaCollection = ({ ssaCollection }) => {
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
    width: 'fit-content',

  }

  const average = arr => arr.reduce((a, b) => a + b, 0) / arr.length;

  return (
    <div className='ssaCollection-container'>
      {ssaCollection.map(ssa => {
        let arr = Object.values(ssa)
        const values = arr.slice(2, 23)
        let count = 0;
        let total = 0;
        values.map((section, index) => {
          if (section.length > 0) count++
          total += (average(section.map(Number))/100)
        })
        let ave = Math.round((count/21)*100)
        if (ave === 1) ave = 100
        const maturityAve = getMaturity((total/21)*100)
        return (
          <div className='ssa-container' key={ssa.title}>
            <Link href={`/${ssa._id}`} passHref>
              <div>
                <Link href={`/${ssa._id}`}>
                  <h2><a>{ssa.title}</a></h2>
                </Link>
                <GaugeChart
                  className='chartAve'
                  style={guageStyle}
                  id='gauge-chart3'
                  nrOfLevels={4}
                  colors={['#FF4C00', '#FF9E15', '#A2D683']}
                  arcWidth={0.4}
                  percent={(maturityAve/4)}
                  textColor='#07224C'
                  hideText={true}
                />
                <p>{ave}% Complete</p>
                <p>Average Maturity: {maturityAve}</p>
                <FeedIcon />
                <Link href={`/${ssa._id}`} passHref>
                  <Button size='large'>View</Button>
                </Link>
                <Link href={`/${ssa._id}/edit`} passHref>
                  <Button size='large'>Edit</Button>
                </Link>
              </div>
            </Link>
          </div>
        )
      })}
    </div >
  )
}

export default SsaCollection;