import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import MobileStepper from '@mui/material/MobileStepper';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

// SECTIONS
import NextGenSOC from '../../components/sections/nextGenSOC';
import SocKPI from '../../components/sections/socKPI';
import UtilizationNormalization from '../../components/sections/utilizationNormalization';
import UseCase from '../../components/sections/useCase';
import Enrichment from '../../components/sections/enrichment';
import Itp from '../../components/sections/itp';
import ThreatHunting from '../../components/sections/threatHunting';
import VulnerabilityManagement from '../../components/sections/vulnerabilityManagement';
import ThreatIntelligence from '../../components/sections/threatIntelligence';
import DataMasking from '../../components/sections/dataMasking';
import Soar from '../../components/sections/soar';
import Process from '../../components/sections/process';
import SocStaff from '../../components/sections/socStaff';
import TrainingAccredidation from '../../components/sections/trainingAccredidation';
import Dfir from '../../components/sections/dfir';
import FraudPrevention from '../../components/sections/fraudPrevention';
import RedBluePurple from '../../components/sections/redBluePurple';
import SecurityMangement from '../../components/sections/securityManagement';
import Risk from '../../components/sections/risk';
import OnCall from '../../components/sections/onCall';
import PhysicalSecurity from '../../components/sections/physicalSecurity';
import ssaQs from '../../components/sections/ssaQs';

// ICONS
import SecurityIcon from '@mui/icons-material/Security';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import DnsIcon from '@mui/icons-material/Dns';
import PsychologyIcon from '@mui/icons-material/Psychology';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';
import CrisisAlertIcon from '@mui/icons-material/CrisisAlert';
import DataObjectIcon from '@mui/icons-material/DataObject';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import ComputerIcon from '@mui/icons-material/Computer';
import PhishingIcon from '@mui/icons-material/Phishing';
import GroupsIcon from '@mui/icons-material/Groups';
import PolicyIcon from '@mui/icons-material/Policy';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import BadgeIcon from '@mui/icons-material/Badge';

import { useRouter } from 'next/router';

const Edit = ({ ssa }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [update, setUpdate] = useState({ ...ssa });
  const router = useRouter();

  useEffect(() => {
    const updateSSA = async () => {
      try {
        const res = await fetch(`/api/collection/${router.query.id}`, {
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(update)
        })
      } catch (error) {
        console.log(error);
      }
    }
    if (isSubmitting) {
      updateSSA();
    } else {
      setIsSubmitting(false);
    }
  }, [isSubmitting, update])

  const handleSubmit = () => {
    setIsSubmitting(true);
  }

  const steps = [
    {
      label: 'Next Generation SOC',
      section: <NextGenSOC ssa={ssa} update={update} setUpdate={setUpdate} nextGenSOCQs={ssaQs['Next Generation SOC Qs']} />,
      icon: <SecurityIcon />
    },
    {
      label: 'SOC KPI',
      section: <SocKPI ssa={ssa} update={update} setUpdate={setUpdate} socKPIQs={ssaQs['SOC KPI Qs']} />,
      icon: <AutoGraphIcon />
    },
    {
      label: 'Utilization & Normalization',
      section: <UtilizationNormalization ssa={ssa} update={update} setUpdate={setUpdate} utilizationNormalizationQs={ssaQs['Utilization & Normalization Qs']} />,
      icon: <AppRegistrationIcon />
    },
    {
      label: 'Use Case',
      section: <UseCase ssa={ssa} update={update} setUpdate={setUpdate} useCaseQs={ssaQs['Use Case Qs']} />,
      icon: <AccessibilityIcon />
    },
    {
      label: 'Enrichment',
      section: <Enrichment ssa={ssa} update={update} setUpdate={setUpdate} enrichmentQs={ssaQs['Enrichment Qs']} />,
      icon: <DnsIcon />
    },
    {
      label: 'Insider Threat Profile',
      section: <Itp ssa={ssa} update={update} setUpdate={setUpdate} itpQs={ssaQs['Insider Threat Profile Qs']} />,
      icon: <WorkHistoryIcon />
    },
    {
      label: 'Threat Hunting',
      section: <ThreatHunting ssa={ssa} update={update} setUpdate={setUpdate} threatHuntingQs={ssaQs['Threat Hunting Qs']} />,
      icon: <LocationSearchingIcon />
    },
    {
      label: 'Vulnerability Management',
      section: <VulnerabilityManagement ssa={ssa} update={update} setUpdate={setUpdate} vulnerabilityManagementQs={ssaQs['Vulnerability Managment Qs']} />,
      icon: <CrisisAlertIcon />
    },
    {
      label: 'Threat Intelligence',
      section: <ThreatIntelligence ssa={ssa} update={update} setUpdate={setUpdate} threatIntelligenceQs={ssaQs['Threat Intelligence Qs']} />,
      icon: <PsychologyIcon />
    },
    {
      label: 'Data Masking',
      section: <DataMasking ssa={ssa} update={update} setUpdate={setUpdate} dataMaskingQs={ssaQs['Data Masking Qs']} />,
      icon: <DataObjectIcon />
    },
    {
      label: 'SOAR',
      section: <Soar ssa={ssa} update={update} setUpdate={setUpdate} soarQs={ssaQs['SOAR Qs']} />,
      icon: <PrecisionManufacturingIcon />
    },
    {
      label: 'Process',
      section: <Process ssa={ssa} update={update} setUpdate={setUpdate} processQs={ssaQs['Process Qs']} />,
      icon: <AccountTreeIcon />
    },
    {
      label: 'SOC Staff',
      section: <SocStaff ssa={ssa} update={update} setUpdate={setUpdate} socStaffQs={ssaQs['SOC Staff Qs']} />,
      icon: <SupportAgentIcon />
    },
    {
      label: 'Training Accredidations',
      section: <TrainingAccredidation ssa={ssa} update={update} setUpdate={setUpdate} trainingAccredidationQs={ssaQs['Training Accredidation Qs']} />,
      icon: <WorkspacePremiumIcon />
    },
    {
      label: 'DFIR',
      section: <Dfir ssa={ssa} update={update} setUpdate={setUpdate} dfirQs={ssaQs['DFIR Qs']} />,
      icon: <ComputerIcon />
    },
    {
      label: 'Fraud Prevention',
      section: <FraudPrevention ssa={ssa} update={update} setUpdate={setUpdate} fraudPreventionQs={ssaQs['Fraud Prevention Qs']} />,
      icon: <PhishingIcon />
    },
    {
      label: 'Red, Blue & Purple Teams',
      section: <RedBluePurple ssa={ssa} update={update} setUpdate={setUpdate} redBluePurpleQs={ssaQs['Red, Blue & Purple Teams Qs']} />,
      icon: <GroupsIcon />
    },
    {
      label: 'Security Mangement',
      section: <SecurityMangement ssa={ssa} update={update} setUpdate={setUpdate} securityMangementQs={ssaQs['Security Mangement Qs']} />,
      icon: <PolicyIcon />
    },
    {
      label: 'Risk',
      section: <Risk ssa={ssa} update={update} setUpdate={setUpdate} riskQs={ssaQs['Risk Qs']} />,
      icon: <AssignmentIcon />
    },
    {
      label: 'On Call',
      section: <OnCall ssa={ssa} update={update} setUpdate={setUpdate} onCallQs={ssaQs['On Call Qs']} />,
      icon: <ContactPhoneIcon />
    },
    {
      label: 'Physical Security',
      section: <PhysicalSecurity ssa={ssa} update={update} setUpdate={setUpdate} physicalSecurityQs={ssaQs['Physical Security Qs']} />,
      icon: <BadgeIcon />
    },
  ];

  // MUI

  const [activeStep, setActiveStep] = useState(0);

  const theme = useTheme();

  const handleNext = () => {
    setIsSubmitting(true);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  return (
    <Box id='edit' sx={{ maxWidth: '100%' }}>
      <Stepper activeStep={activeStep} orientation='vertical'>
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              onClick={handleStep(index)}
              optional={
                index === 20 ? (
                  <Typography variant='caption'>Last step</Typography>
                ) : null
              }
            >
              <div className='title'> {step.icon} {step.label} </div>
            </StepLabel>
            <StepContent>
              <Typography>{step.description}</Typography>
              {step.section}
              <Box sx={{ mb: 2 }}>
                <div>
                  <MobileStepper
                    variant="progress"
                    steps={21}
                    position="static"
                    activeStep={activeStep}
                    sx={{ maxWidth: 400, flexGrow: 1 }}
                    nextButton={
                      <Button size="small" onClick={handleNext} disabled={activeStep === 5}>
                        {index === steps.length - 1 ? 'Finish' : 'Next'}
                        {theme.direction === 'rtl' ? (
                          <KeyboardArrowLeft />
                        ) : (
                          <KeyboardArrowRight />
                        )}
                      </Button>
                    }
                    backButton={
                      <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                        {theme.direction === 'rtl' ? (
                          <KeyboardArrowRight />
                        ) : (
                          <KeyboardArrowLeft />
                        )}
                        Back
                      </Button>
                    }
                  />
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Paper>
      )}
    </Box>
  );
}

Edit.getInitialProps = async ({ query: { id } }) => {
  const res = await fetch(`${process.env.AUTH0_BASE_URL}/api/collection/${id}`);
  const { data } = await res.json();

  return { ssa: data }
}

export default Edit;
