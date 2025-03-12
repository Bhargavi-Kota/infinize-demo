export const metadata = {
    title: 'Infinize',
    description: 'Infinize'
};

import ClientLayout from './clientLayout'; // Import ClientLayout

export default function RootLayout({children}) {
    return (
        <html lang="en">
            <body>
                <ClientLayout>{children}</ClientLayout>
            </body>
        </html>
    );
}
