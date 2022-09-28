import React from "react";

export const useCalculateStatus = (lastActivity: number) => {
  const [calculatedStatus, setCalculatedStatus] = React.useState<string>("");

  React.useEffect(() => {
    if(lastActivity === 0) setCalculatedStatus("online");
    if(lastActivity < 10) setCalculatedStatus("just now");
    if(lastActivity > 10) {
      if(lastActivity <= 60) setCalculatedStatus(`${lastActivity} seconds ago`); 
      if(lastActivity > 60) setCalculatedStatus(`${(lastActivity / 60).toFixed(0)} ${lastActivity < 90 ? "minute" : "minutes"} ago`); // 90 seconds equivalent of one and a half minutes
      if(lastActivity > 3600) setCalculatedStatus(`${(lastActivity / 3600).toFixed(0)} ${lastActivity < 5400 ? "hour" : "hours"} ago`); // 5400 seconds equivalent of an hour and a half
      if(lastActivity > 86400) setCalculatedStatus(`${(lastActivity / 86400).toFixed(0)} ${lastActivity < 129600 ? "day" : "day's"} ago`); // 129600 seconds equivalent of a day and a half
    }
  }, [lastActivity]);

  return calculatedStatus;
}

