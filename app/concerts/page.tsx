import { format } from 'date-fns';

export const metadata = {
  title: 'Concerts & Events - Raymond Revel',
  description: 'Upcoming concerts and events featuring Raymond Revel.',
};

// Example concert data structure
interface Concert {
  date: string;
  venue: string;
  location: string;
  ticketLink?: string;
  status: 'upcoming' | 'past';
}

const concerts: Concert[] = [
  // Add your concerts here
  // Example:
  // {
  //   date: '2025-12-15',
  //   venue: 'Venue Name',
  //   location: 'City, State',
  //   ticketLink: 'https://example.com/tickets',
  //   status: 'upcoming',
  // },
];

export default function Concerts() {
  const upcomingConcerts = concerts.filter(c => c.status === 'upcoming');
  const pastConcerts = concerts.filter(c => c.status === 'past');

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-12 text-center">
          Concerts & Events
        </h1>

        {/* Upcoming Concerts */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-8">
            Upcoming Shows
          </h2>
          {upcomingConcerts.length > 0 ? (
            <div className="space-y-6">
              {upcomingConcerts.map((concert, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                        {format(new Date(concert.date), 'EEEE, MMMM d, yyyy')}
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                        {concert.venue}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {concert.location}
                      </p>
                    </div>
                    {concert.ticketLink && (
                      <a
                        href={concert.ticketLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full font-semibold hover:opacity-90 transition-opacity text-center"
                      >
                        Get Tickets
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <p className="text-gray-600 dark:text-gray-400">
                No upcoming shows scheduled at this time. Check back soon!
              </p>
            </div>
          )}
        </section>

        {/* Past Concerts */}
        {pastConcerts.length > 0 && (
          <section>
            <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-8">
              Past Shows
            </h2>
            <div className="space-y-4">
              {pastConcerts.map((concert, index) => (
                <div
                  key={index}
                  className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {format(new Date(concert.date), 'MMMM d, yyyy')}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {concert.venue}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {concert.location}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Booking Information */}
        <section className="mt-16 bg-gray-50 dark:bg-gray-900 rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Booking Inquiries
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Interested in booking Raymond Revel for your event? Get in touch!
          </p>
          <a
            href="mailto:raymondrevelmusic@gmail.com"
            className="inline-block px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full font-semibold hover:opacity-90 transition-opacity"
          >
            Contact for Booking
          </a>
        </section>
      </div>
    </div>
  );
}

