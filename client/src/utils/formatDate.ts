
export default function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString(
        "en-US", 
        {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "numeric",
            minute: "numeric"
        }
    );
}