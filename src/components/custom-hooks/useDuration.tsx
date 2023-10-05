const useDuration = (hoursAgo: number) => {
    const currentDate: any = new Date();
  
    // Calculate the date and time 72 hours (3 days) ago
    const millisecondsInAnHour = 60 * 60 * 1000; // 1 hour = 60 minutes * 60 seconds * 1000 milliseconds
    const duration: any = new Date(currentDate - hoursAgo * millisecondsInAnHour);
  
    return { currentDate, duration };
  };
  export default useDuration;
  