import { GA4React } from 'ga-4-react';
import { config } from '../firebase/config';

const ga4react = new GA4React(config.firebaseConfig.measurementId).initialize();

export interface AnalyticsData {
  path: string;
  search: string;
  title: string;
}

const AnalyticsTracker = (data: AnalyticsData) => {
  const { path, search, title } = data;
  ga4react
    .then((ga) => {
      ga.pageview(path, search, title);
    })
    .catch((err) => console.error(`Analytics failed: ${err}`));
};

export default AnalyticsTracker;
