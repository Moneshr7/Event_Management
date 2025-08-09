import { useParams } from 'react-router-dom';

export default function EventDetailsPage() {
  const { id } = useParams();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Edit Event</h1>
      <p>Event ID: {id}</p>
      {/* Here you can fetch event details by ID and show an edit form */}
    </div>
  );
}
