const DashboardCard = ({ title, value }: { title: string; value: string | number }) => {
    return (
      <div className="bg-light rounded-lg shadow p-6">
        <h2 className="text-lg font-bold mb-4">{title}</h2>
        <p className="font-body text-lg text-gray-600">{value}</p>
      </div>
    );
  };
  
  export default DashboardCard;
  