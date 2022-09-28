import ContentLoader from 'react-content-loader';

const ChannelSkeleton = () => (
  <ContentLoader 
    speed={2}
    width={300}
    height={70}
    viewBox="0 0 300 70"
    backgroundColor="#b3c3d3"
    foregroundColor="#242f3f"
  >
    <rect x="70" y="20" rx="3" ry="3" width="140" height="6" /> 
    <rect x="240" y="20" rx="3" ry="3" width="40" height="6" /> 
    <rect x="70" y="40" rx="3" ry="3" width="210" height="3" /> 
    <rect x="70" y="50" rx="3" ry="3" width="210" height="3" /> 
    <circle cx="40" cy="40" r="25" />
  </ContentLoader>

);

export default ChannelSkeleton;