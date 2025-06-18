"use client"

import {useState} from "react"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Edit, PlusCircle, Search, Trash2} from "lucide-react"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table"
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {FAQModal} from "@/components/modals";

const faqs = [
    {
        id: "faq-1",
        question: "How do I reset my password?",
        answer:
            "To reset your password, click on the 'Forgot Password' link on the login page. Enter your email address, and we'll send you a link to reset your password. Follow the instructions in the email to create a new password.",
    },
    {
        id: "faq-2",
        question: "How can I add a new patient to the system?",
        answer:
            "To add a new patient, navigate to the Patients section from the sidebar, then click on the 'Add Patient' button. Fill out the required information in the form and click 'Save' to create the patient record.",
    },
    {
        id: "faq-3",
        question: "How do I schedule an appointment?",
        answer:
            "To schedule an appointment, go to the Appointments section and click 'Add Appointment'. Select the patient, doctor, date, time, and appointment type. You can also add notes or specific instructions before saving the appointment.",
    },
    {
        id: "faq-4",
        question: "Can I export patient data?",
        answer:
            "Yes, you can export patient data. Navigate to the Patients section, select the analytics you want to export, then click the 'Export' button. You can choose between CSV, Excel, or PDF formats depending on your needs.",
    },
    {
        id: "faq-5",
        question: "How do I generate billing reports?",
        answer:
            "To generate billing reports, go to the Reports section and select 'Financial Reports'. You can filter by date range, department, or service type. Click 'Generate Report' to create the report, which can then be viewed, printed, or exported.",
    },
    {
        id: "faq-6",
        question: "How can I manage staff schedules?",
        answer:
            "Staff schedules can be managed in the Staff section. Select a staff member and click on 'Schedule'. You can set regular working hours, add exceptions, and manage time off requests. The system will automatically check for conflicts.",
    },
    {
        id: "faq-7",
        question: "What should I do if I encounter an error?",
        answer:
            "If you encounter an error, first try refreshing the page. If the error persists, note the error message and the actions you were taking when it occurred. Submit a support ticket with these details so our team can assist you.",
    },
    {
        id: "faq-8",
        question: "How do I update patient insurance information?",
        answer:
            "To update insurance information, go to the patient's profile, click on the 'Insurance' tab, and select 'Edit'. Update the necessary fields and save the changes. The system will automatically apply the new insurance information to future billing.",
    },
    {
        id: "faq-9",
        question: "Can I customize the dashboard?",
        answer:
            "Yes, you can customize your dashboard. Click on the settings-c icon in the top-right corner of the dashboard and select 'Customize Dashboard'. You can add, remove, or rearrange widgets based on your preferences and role.",
    },
    {
        id: "faq-10",
        question: "How do I set up automated appointment reminders?",
        answer:
            "Automated reminders can be configured in the Settings section under 'Notifications'. You can set up email, SMS, or in-app reminders, and specify how far in advance they should be sent. You can also customize the reminder message.",
    },
]

export default function SupportFAQ() {
    const [searchQuery, setSearchQuery] = useState("")
    const [open, setOpen] = useState(false);

    const filteredFAQs = faqs.filter(
        (faq) =>
            faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
    )

    return (
        <div className="container mx-auto space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-2xl md:text-2xl lg:text-3xl font-bold tracking-tight">Feedback Management</h2>
                    <p className="text-muted-foreground">Create and manage patient feedback surveys</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="secondary" size="sm">
                        <Link href="/faq/category">
                            Manage Category
                        </Link>
                    </Button>
                    <Button size="sm" onClick={()=>setOpen(true)}>
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Add Faq
                    </Button>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Frequently Asked Questions</CardTitle>
                    <CardDescription>Find answers to common questions about using the clinic management system</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="relative mb-6">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search FAQs..."
                            className="pl-8"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[300px]">Question</TableHead>
                                <TableHead className="hidden sm:table-cell">Answer</TableHead>
                                <TableHead className="hidden sm:table-cell">Category</TableHead>
                                <TableHead className="w-[120px] text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {faqs.map((faq) => (
                                <TableRow key={faq.id}>
                                    <TableCell className="font-medium align-top">{faq.question}</TableCell>
                                    <TableCell className="align-top hidden sm:table-cell">{faq.answer}</TableCell>
                                    <TableCell className="hidden md:table-cell">Home</TableCell>
                                    <TableCell className="text-right align-top">
                                        <div className="flex justify-end gap-2">
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                className="h-8 w-8"
                                                onClick={() => setOpen(true)}
                                            >
                                                <Edit className="h-4 w-4" />
                                                <span className="sr-only">Edit FAQ</span>
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                className="h-8 w-8 text-destructive hover:text-destructive"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                                <span className="sr-only">Delete FAQ</span>
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
            <FAQModal isOpen={open} onClose={setOpen} />
        </div>
    )
}
