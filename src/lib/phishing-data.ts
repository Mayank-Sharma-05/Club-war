import { PhishingChallengeSet } from "../types/game";

export const PHISHING_CHALLENGE_SETS: PhishingChallengeSet[] = [
  {
    "id": "set-01",
    "scenarioTitle": "Faculty Research Assistantship",
    "emails": [
      {
        "id": "s01-e1",
        "senderName": "Prof. Arthur Pendelton",
        "senderEmail": "a.pendelton@university.edu",
        "date": "Today, 09:14 AM",
        "subject": "CS402 Machine Learning Research Positions",
        "body": "Our departmental machine learning laboratory has two open research assistant positions for the upcoming term. Interested candidates must have completed data structures with a grade of B or higher. The weekly workload is ten hours, and students will assist with data cleaning and model validation. Review the attached project syllabus and prerequisites before our departmental interview sessions next Thursday afternoon.",
        "linkOrAttachment": {
          "type": "attachment",
          "fileName": "Lab_Research_Prerequisites_2026.pdf",
          "fileSize": "418 KB"
        },
        "explanation": "Authentic university faculty email sent from an official institutional domain (@university.edu) discussing a genuine lab opening with a standard course syllabus attachment.",
        "isPhishing": false
      },
      {
        "id": "s01-e2",
        "senderName": "Prof. Arthur Pendelton (Personal)",
        "senderEmail": "prof.arthur.pendelton.office@gmail.com",
        "date": "Today, 10:02 AM",
        "subject": "URGENT: Confidential Research Task & Mobile Response",
        "body": "I am currently presenting at an international faculty board conference and cannot answer telephone calls or access my departmental mailbox. I need an undergraduate assistant to urgently handle a confidential assignment for the department. Please reply directly to this personal email with your WhatsApp phone number and current residential address so I can text you the instructions and project funds immediately today.",
        "explanation": "Indicators: Sender using an external Gmail address while impersonating a professor, claiming meeting unavailability, and soliciting personal phone numbers and home addresses without standard university channels.",
        "isPhishing": true
      },
      {
        "id": "s01-e3",
        "senderName": "University Career Services",
        "senderEmail": "careers@university.edu",
        "date": "Today, 11:30 AM",
        "subject": "Campus Employment Work-Study Verification",
        "body": "The student employment office has updated the on-campus work eligibility rosters for this academic year. All students seeking teaching assistantships or departmental research positions should ensure their work-study documentation is approved before departmental payroll deadlines. You may verify your active work authorization status directly through the centralized student portal before submitting applications to individual academic departments across our campus.",
        "linkOrAttachment": {
          "type": "link",
          "text": "Student Employment Portal",
          "url": "https://careers.university.edu/student/work-study"
        },
        "explanation": "Legitimate student employment advisory sent from the official campus careers domain pointing directly to the secure internal university student career sub-portal.",
        "isPhishing": false
      },
      {
        "id": "s01-e4",
        "senderName": "University Library Circulation",
        "senderEmail": "circulation@library.university.edu",
        "date": "Today, 01:15 PM",
        "subject": "Research Reserve Material Available for Pickup",
        "body": "The reference volume you requested for your computer science research seminar has been transferred from the archival storage facility and is now held at the central circulation desk. Please bring your physical student identification badge when collecting the materials. Reserved books may be checked out for a maximum of three days due to high departmental course demand across our university.",
        "explanation": "Routine, trustworthy notification from the campus library circulation desk detailing reserved pickup procedures without asking for sensitive credentials or personal payments.",
        "isPhishing": false
      }
    ]
  },
  {
    "id": "set-02",
    "scenarioTitle": "Campus Housing Allocation",
    "emails": [
      {
        "id": "s02-e1",
        "senderName": "Student Housing Services",
        "senderEmail": "housing-portal@university-residences-verify.com",
        "date": "Yesterday, 04:22 PM",
        "subject": "ACTION REQUIRED: Confirm Dormitory Room Allocation",
        "body": "Due to unprecedented campus enrollment numbers, dormitory rooms for the approaching term are being redistributed on a first-confirmed basis. Your currently reserved single-occupancy suite will be released to the waiting list within twelve hours unless you verify your student identity. Log into the external housing verification system below using your primary campus network credentials to protect your housing reservation today.",
        "linkOrAttachment": {
          "type": "link",
          "text": "Confirm Housing Reservation",
          "url": "https://university-residences-verify.com/login"
        },
        "explanation": "Indicators: Mismatched external domain (university-residences-verify.com), artificial panic and countdown threat (twelve hours), and credential harvesting login link.",
        "isPhishing": true
      },
      {
        "id": "s02-e2",
        "senderName": "Office of Residence Life",
        "senderEmail": "reslife@university.edu",
        "date": "Yesterday, 02:10 PM",
        "subject": "Annual Roommate Agreement Form & Guidelines",
        "body": "Welcome to campus residential living for the upcoming academic year. All residents in shared suites must review and complete the standardized roommate agreement before the end of the second week of classes. This agreement helps establish mutual expectations regarding quiet study hours, guest visitation, and shared refrigerator storage. Download and print the attached agreement document for your suite today.",
        "linkOrAttachment": {
          "type": "attachment",
          "fileName": "Roommate_Living_Agreement_2026.pdf",
          "fileSize": "284 KB"
        },
        "explanation": "Legitimate institutional email from the Residence Life department providing an official policy PDF without demanding private passwords or financial payments.",
        "isPhishing": false
      },
      {
        "id": "s02-e3",
        "senderName": "Campus Facilities Management",
        "senderEmail": "facilities@university.edu",
        "date": "Yesterday, 11:45 AM",
        "subject": "Scheduled Water Maintenance: North Residential Quad",
        "body": "Facilities maintenance engineers will be conducting scheduled pressure inspections on the primary hot water boilers in the North Residential Quad this coming Saturday between seven and eleven in the morning. Hot water service will be temporarily intermittent during this window. Cold water and electricity will remain unaffected. We apologize for any inconvenience during these mandatory safety compliance tests across campus.",
        "explanation": "Standard operational facilities bulletin informing residents of routine maintenance work sent from the official campus facilities domain.",
        "isPhishing": false
      },
      {
        "id": "s02-e4",
        "senderName": "Campus Sustainability Committee",
        "senderEmail": "sustainability@university.edu",
        "date": "Yesterday, 09:30 AM",
        "subject": "Dormitory Energy Conservation Challenge",
        "body": "The annual inter-dormitory energy conservation competition launches this Monday across all undergraduate residence halls. Residence buildings that reduce aggregate electricity consumption by at least eight percent will receive bonus funding for community lounge equipment. You can track your building's hourly electricity consumption metrics on the public university sustainability portal dashboard throughout the month-long tournament across our campus.",
        "linkOrAttachment": {
          "type": "link",
          "text": "Live Energy Dashboard",
          "url": "https://sustainability.university.edu/dashboard"
        },
        "explanation": "Benign campus student life initiative linking directly to an authentic internal university educational subdomain.",
        "isPhishing": false
      }
    ]
  },
  {
    "id": "set-03",
    "scenarioTitle": "Student Health Insurance",
    "emails": [
      {
        "id": "s03-e1",
        "senderName": "Student Wellness Center",
        "senderEmail": "wellness@university.edu",
        "date": "Today, 08:30 AM",
        "subject": "Seasonal Flu Vaccination Clinic Schedule",
        "body": "The University Student Wellness Center is hosting our complimentary seasonal influenza vaccination clinic this Wednesday and Thursday in the student union multipurpose ballroom. All currently enrolled students are eligible to receive a vaccine at no additional out-of-pocket expense. Please review the attached immunization informational sheet and consent documentation prior to arriving at the clinic location on campus.",
        "linkOrAttachment": {
          "type": "attachment",
          "fileName": "Flu_Vaccine_Consent_Form.pdf",
          "fileSize": "312 KB"
        },
        "explanation": "Authentic university health service communication providing a standard vaccine informational consent PDF from the verified @university.edu address.",
        "isPhishing": false
      },
      {
        "id": "s03-e2",
        "senderName": "Campus Pharmacy Dispensary",
        "senderEmail": "pharmacy@university.edu",
        "date": "Today, 10:15 AM",
        "subject": "Prescription Medication Order Ready for Collection",
        "body": "Your maintenance prescription order has been packaged and is currently awaiting pickup at the campus pharmacy dispensary located in the health sciences complex. Please bring a valid photo identification card and your student health card when collecting your medication. Our service counter is open weekdays until five in the afternoon for student convenience across the university community.",
        "explanation": "Standard institutional pharmacy notification informing the recipient of ready pickup, with zero suspicious requests or abnormal external domains.",
        "isPhishing": false
      },
      {
        "id": "s03-e3",
        "senderName": "Student Health Plan Administration",
        "senderEmail": "healthplans@university.edu",
        "date": "Today, 11:40 AM",
        "subject": "Download Your Digital Insurance Membership Card",
        "body": "Your comprehensive student health insurance policy coverage has been renewed for the current semester. You may access and download your official digital membership identification card directly through the university student health services portal. Keep an electronic copy on your smartphone for medical appointments and emergency off-campus healthcare provider consultations throughout the academic school term.",
        "linkOrAttachment": {
          "type": "link",
          "text": "Access Health Card Portal",
          "url": "https://health.university.edu/my-insurance"
        },
        "explanation": "Legitimate institutional email from the health plans office directing the student to an authentic university.edu sub-portal.",
        "isPhishing": false
      },
      {
        "id": "s03-e4",
        "senderName": "Health Billing Department",
        "senderEmail": "billing-health-service@fastwiretransfer.net",
        "date": "Today, 01:25 PM",
        "subject": "URGENT NOTICE: Health Coverage Lapsed - Immediate Wire Required",
        "body": "Your mandatory university health insurance policy has lapsed due to an unpaid underwriting surcharge of $240. Under university regulations, uninsured students face immediate suspension from all academic courses and laboratory facilities. You must resolve this balance today by sending an electronic wire transfer to our regional escrow account at Account Number 84729104. Reply with your transaction receipt immediately today.",
        "explanation": "Indicators: Third-party financial domain (@fastwiretransfer.net), extreme coercion with threats of academic suspension, and demanding direct wire transfers to an unknown bank account with NO official university billing invoice.",
        "isPhishing": true
      }
    ]
  },
  {
    "id": "set-04",
    "scenarioTitle": "Final Examination Timetable",
    "emails": [
      {
        "id": "s04-e1",
        "senderName": "Office of the University Registrar",
        "senderEmail": "registrar@university.edu",
        "date": "Monday, 09:00 AM",
        "subject": "Official Fall Semester Final Examination Schedule",
        "body": "The final examination schedule for all undergraduate lecture and laboratory sections has been published by the academic scheduling committee. Please examine your personalized course timetable on the registrar's official portal to verify examination dates, building locations, and room numbers. Report any overlapping examination conflicts to your faculty advisors before the published administrative deadline for the term.",
        "linkOrAttachment": {
          "type": "link",
          "text": "Registrar Exam Schedule",
          "url": "https://registrar.university.edu/finals-2026"
        },
        "explanation": "Authentic administrative email from the university registrar directing students to official exam scheduling on registrar.university.edu.",
        "isPhishing": false
      },
      {
        "id": "s04-e2",
        "senderName": "Prof. Michael Chang",
        "senderEmail": "m.chang@university.edu",
        "date": "Monday, 11:20 AM",
        "subject": "CS301 Algorithm Review Session & Practice Questions",
        "body": "Our teaching assistants will hold a comprehensive algorithm review session this Wednesday evening in the main science lecture auditorium. We will cover dynamic programming and graph traversal problem patterns. The attached review packet includes sample questions from previous midterm examinations along with recommended textbook practice exercises. Attendance is strongly encouraged for all enrolled students across our department.",
        "linkOrAttachment": {
          "type": "attachment",
          "fileName": "CS301_Final_Review_Packet.pdf",
          "fileSize": "680 KB"
        },
        "explanation": "Legitimate educational message from an actual course professor attaching a standard course review PDF from an official institutional address.",
        "isPhishing": false
      },
      {
        "id": "s04-e3",
        "senderName": "Academic Timetable Emergency",
        "senderEmail": "exam-updates@campus-registrar-portal.net",
        "date": "Monday, 01:15 PM",
        "subject": "URGENT CORRECTION: Critical Examination Changes Released",
        "body": "A serious scheduling conflict has forced an emergency reassignment of multiple departmental final examinations across the computer science and mathematics divisions. Several examination rooms have changed times and locations. All students must download and run the attached compressed archive update file immediately to inspect their revised testing assignments and prevent unexcused course failure across the campus.",
        "linkOrAttachment": {
          "type": "attachment",
          "fileName": "Final_Exam_Updates_2026.zip",
          "fileSize": "1.4 MB"
        },
        "explanation": "Indicators: Deceptive lookalike domain (.net), high-pressure panic claiming unexcused course failure, and delivering an executable or malicious compressed archive (.zip) instead of standard PDF documents.",
        "isPhishing": true
      },
      {
        "id": "s04-e4",
        "senderName": "Student Accessibility Services",
        "senderEmail": "accessibility@university.edu",
        "date": "Monday, 03:40 PM",
        "subject": "Final Exam Testing Accommodations Deadline",
        "body": "Students registered with Student Accessibility Services who require accommodated testing conditions, extended examination duration, or private testing cubicles for final examinations must submit their proctoring reservation forms by Friday afternoon. Our testing coordinators will finalize individual room allocations early next week. Contact our office directly if you require adjustments to your approved accommodation plan this term.",
        "explanation": "Routine compliance and student support notice sent by the legitimate campus accessibility center without external links or questionable demands.",
        "isPhishing": false
      }
    ]
  },
  {
    "id": "set-05",
    "scenarioTitle": "Campus Recruitment & Placements",
    "emails": [
      {
        "id": "s05-e1",
        "senderName": "University Career Center",
        "senderEmail": "recruitment@university.edu",
        "date": "Tuesday, 08:45 AM",
        "subject": "Annual Technology Career Fair: Digital Entry Pass",
        "body": "Over seventy regional technology employers and corporate research laboratories will attend tomorrow's annual technology career fair in the campus recreation complex. Remember to bring printed copies of your technical resume and wear business casual attire. You can generate your expedited digital check-in barcode pass through the student career portal before arriving at the venue entrance tomorrow morning.",
        "linkOrAttachment": {
          "type": "link",
          "text": "Generate Career Fair Pass",
          "url": "https://careers.university.edu/fairs/tech-pass"
        },
        "explanation": "Official university career fair announcement linking to the genuine institutional career portal for admission badge issuance.",
        "isPhishing": false
      },
      {
        "id": "s05-e2",
        "senderName": "Google Talent Acquisition",
        "senderEmail": "recruiter-google-internships@gmail-hiring.com",
        "date": "Tuesday, 10:30 AM",
        "subject": "Offer Pre-Screen: Verification Code Required for $48/hr Role",
        "body": "We reviewed your software engineering profile in the university candidate book and selected you for a remote junior developer position paying $48 per hour. To confirm your employment interview time, our automated candidate screening system has sent a six-digit verification code to your mobile phone number. Reply to this email with that code immediately so we can finalize your background clearance today.",
        "explanation": "Indicators: Mismatched fraudulent domain (gmail-hiring.com), unrealistic high-paying job offer without an interview, and social engineering to steal an SMS multi-factor authentication (OTP) code.",
        "isPhishing": true
      },
      {
        "id": "s05-e3",
        "senderName": "Engineering Career Advisory",
        "senderEmail": "eng-careers@university.edu",
        "date": "Tuesday, 01:05 PM",
        "subject": "Technical Resume & Portfolio Template Guide",
        "body": "Before meeting corporate recruiters at the technology career fair, review our comprehensive technical resume template developed in partnership with leading industry software engineering managers. The attached document highlights best practices for describing GitHub open-source contributions, academic coursework projects, and technical programming proficiencies. Peer advisors are available all afternoon for drop-in resume critique sessions in our office.",
        "linkOrAttachment": {
          "type": "attachment",
          "fileName": "Engineering_Resume_Standard_2026.pdf",
          "fileSize": "340 KB"
        },
        "explanation": "Authentic student support material from the engineering career advisory team attaching an instructional resume guide PDF.",
        "isPhishing": false
      },
      {
        "id": "s05-e4",
        "senderName": "Department of Computer Science",
        "senderEmail": "cs-office@university.edu",
        "date": "Tuesday, 03:20 PM",
        "subject": "Alumni Speaker Panel: Transitioning to Tech Industry",
        "body": "The Computer Science Department is hosting an interactive alumni speaker panel this Thursday evening in the technology building auditorium. Four recent university graduates working at regional software companies will share insights regarding technical coding interviews, salary negotiation, and career growth. Light refreshments will be served following the question and answer segment for all attendees from the department.",
        "explanation": "Normal departmental academic event invitation sent from the official computer science administration office.",
        "isPhishing": false
      }
    ]
  },
  {
    "id": "set-06",
    "scenarioTitle": "Library Overdue Book Penalties",
    "emails": [
      {
        "id": "s06-e1",
        "senderName": "University Library Collections",
        "senderEmail": "fines-portal@campus-library-penalties.xyz",
        "date": "Wednesday, 08:15 AM",
        "subject": "URGENT OVERDUE FINE: Settle Replacement Balance Immediately",
        "body": "An overdue library volume has exceeded the maximum checkout threshold by fourteen business days. A mandatory replacement fine of $85 has been placed against your academic profile. To prevent an immediate hold on your course registration and university transcripts, click the secure online payment portal link below to submit your debit card billing information before five o'clock this evening.",
        "linkOrAttachment": {
          "type": "link",
          "text": "Pay Overdue Fine Online",
          "url": "https://campus-library-penalties.xyz/pay"
        },
        "explanation": "Indicators: Fraudulent non-institutional domain (.xyz), high-pressure intimidation threatening transcript holds, and direct debit card credential harvesting.",
        "isPhishing": true
      },
      {
        "id": "s06-e2",
        "senderName": "Campus Library Circulation",
        "senderEmail": "library@university.edu",
        "date": "Wednesday, 10:20 AM",
        "subject": "Notice of Upcoming Book Loan Due Date",
        "body": "The two physics textbooks you borrowed from the science and engineering branch library are due for return in three calendar days. You may renew your loan online for an additional two-week period through your personal student library account, provided no other university student has placed an active hold request on the materials. Contact our circulation desk if you require assistance.",
        "linkOrAttachment": {
          "type": "link",
          "text": "Renew Library Loan",
          "url": "https://library.university.edu/my-loans"
        },
        "explanation": "Legitimate institutional email from the university library providing standard book renewal instructions via the official university.edu subdomain.",
        "isPhishing": false
      },
      {
        "id": "s06-e3",
        "senderName": "Research Help Services",
        "senderEmail": "research-help@library.university.edu",
        "date": "Wednesday, 01:45 PM",
        "subject": "Research Consultation Appointment Confirmation",
        "body": "Your upcoming research appointment with the subject specialist librarian has been scheduled for next Tuesday afternoon in library conference room four. Please bring your preliminary topic outline and research questions. The attached research strategy document provides useful database search operators and Boolean syntax guidelines to review before our scheduled meeting to make our consultation session as productive as possible for your project.",
        "linkOrAttachment": {
          "type": "attachment",
          "fileName": "Research_Strategy_Guide_2026.pdf",
          "fileSize": "245 KB"
        },
        "explanation": "Standard academic support communication from the library research consultation staff attaching an educational research PDF.",
        "isPhishing": false
      },
      {
        "id": "s06-e4",
        "senderName": "Library Building Operations",
        "senderEmail": "library-admin@university.edu",
        "date": "Wednesday, 03:30 PM",
        "subject": "Extended 24-Hour Study Hours for Midterms",
        "body": "Starting this coming Sunday evening, the central campus library will remain open continuously twenty-four hours daily through the completion of the midterm examination cycle. Additional university security monitors will be stationed on all floors throughout overnight hours. Complimentary hot tea and coffee will be served in the ground floor cafe lounge between midnight and four in the morning for all studying students.",
        "explanation": "Routine student service announcement sent from the official library administration informing students of extended hours.",
        "isPhishing": false
      }
    ]
  },
  {
    "id": "set-07",
    "scenarioTitle": "Dean of Engineering Executive Request",
    "emails": [
      {
        "id": "s07-e1",
        "senderName": "Dean's Office of Engineering",
        "senderEmail": "engineering-dean@university.edu",
        "date": "Thursday, 09:10 AM",
        "subject": "Dean's Honor List Academic Distinction",
        "body": "Congratulations on your exceptional academic performance during the previous semester. You have officially qualified for the Dean's Honor List by maintaining a term grade point average above 3.75 across rigorous engineering coursework. Please find your official certificate of academic distinction attached to this email. The entire faculty and staff commend your intellectual curiosity, discipline, and sustained scholarly dedication to engineering excellence.",
        "linkOrAttachment": {
          "type": "attachment",
          "fileName": "Deans_Honor_Certificate_2026.pdf",
          "fileSize": "520 KB"
        },
        "explanation": "Authentic departmental honor recognition sent from the official dean's office domain attaching a standard recognition certificate PDF.",
        "isPhishing": false
      },
      {
        "id": "s07-e2",
        "senderName": "Engineering Student Council",
        "senderEmail": "esc@university.edu",
        "date": "Thursday, 11:35 AM",
        "subject": "Annual Engineering Student Town Hall with the Dean",
        "body": "The annual engineering student town hall takes place next Wednesday afternoon in the main technology auditorium. Undergraduate and graduate students are invited to discuss laboratory facility upgrades, teaching assistant allocations, and course scheduling priorities directly with the dean and departmental chairs. You may submit questions in advance through the official student council feedback portal link below before the session.",
        "linkOrAttachment": {
          "type": "link",
          "text": "Submit Town Hall Questions",
          "url": "https://engineering.university.edu/town-hall-qa"
        },
        "explanation": "Genuine campus student government communication linking directly to an institutional feedback form on engineering.university.edu.",
        "isPhishing": false
      },
      {
        "id": "s07-e3",
        "senderName": "Engineering Accreditation Board",
        "senderEmail": "accreditation@university.edu",
        "date": "Thursday, 01:50 PM",
        "subject": "Scheduled ABET Reaccreditation Campus Visit",
        "body": "Next month our engineering degree programs will undergo scheduled reaccreditation evaluation by the national academic review board. Visiting committee reviewers will observe several undergraduate laboratory sections and examine student capstone design deliverables. Regular classes will proceed according to schedule. We appreciate your cooperation as our engineering department showcases our rigorous curriculum standards and state-of-the-art laboratory research environments.",
        "explanation": "Standard departmental policy announcement regarding academic accreditation procedures from the verified university.edu address.",
        "isPhishing": false
      },
      {
        "id": "s07-e4",
        "senderName": "Dean Elena Rostova (Personal)",
        "senderEmail": "dean.elena.rostova.dept@gmail.com",
        "date": "Thursday, 03:15 PM",
        "subject": "CONFIDENTIAL ASSISTANCE: Urgent Mobile Response Required",
        "body": "I am currently in an executive session with the university board of trustees and cannot take phone calls or access my departmental mailbox. I need an active student leader to assist me with a time-sensitive confidential university conference task. Could you please text my private mobile phone at +1-917-555-0143 right away so I can direct you to purchase digital gift cards for conference speakers?",
        "explanation": "Indicators: Classic executive impersonation attack using an external Gmail address, claiming meeting unavailability, and soliciting private texting to purchase gift cards.",
        "isPhishing": true
      }
    ]
  },
  {
    "id": "set-08",
    "scenarioTitle": "Campus IT Account Security",
    "emails": [
      {
        "id": "s08-e1",
        "senderName": "Campus IT Infrastructure",
        "senderEmail": "helpdesk@university.edu",
        "date": "Friday, 08:30 AM",
        "subject": "Scheduled Wireless Access Point Maintenance",
        "body": "Network infrastructure engineers will perform routine firmware updates on campus wireless access points early Sunday morning between two and six. Brief wireless disconnections lasting up to five minutes may occur across academic lecture halls and student dormitories during this maintenance window. Wired campus network connections will remain fully operational. Download our network configuration instructions from the attached setup guide.",
        "linkOrAttachment": {
          "type": "attachment",
          "fileName": "Campus_WiFi_Setup_Guide.pdf",
          "fileSize": "310 KB"
        },
        "explanation": "Authentic campus IT maintenance bulletin providing a helpful network setup PDF from the verified @university.edu address.",
        "isPhishing": false
      },
      {
        "id": "s08-e2",
        "senderName": "Information Security Office",
        "senderEmail": "infosec@university.edu",
        "date": "Friday, 10:45 AM",
        "subject": "Multi-Factor Authentication Device Enrollment Reminder",
        "body": "As part of our annual campus cybersecurity standards, all enrolled students must register at least two multi-factor authentication methods for university single sign-on logins. Having a backup mobile device or hardware security key prevents account lockouts during semester examinations. Review the step-by-step setup documentation and manage your registered verification devices through the university security dashboard link below.",
        "linkOrAttachment": {
          "type": "link",
          "text": "Manage MFA Devices",
          "url": "https://security.university.edu/mfa-setup"
        },
        "explanation": "Legitimate institutional security reminder directing students to manage security credentials on security.university.edu.",
        "isPhishing": false
      },
      {
        "id": "s08-e3",
        "senderName": "Campus IT Support Desk",
        "senderEmail": "admin-helpdesk@university-mail-quota-upgrade.org",
        "date": "Friday, 01:20 PM",
        "subject": "WARNING: Student Mailbox Storage Exceeded - Immediate Action",
        "body": "Your primary university student mailbox has reached ninety-eight percent capacity. Incoming emails will be automatically rejected and deleted by the server within eight hours unless you expand your storage allocation. Click the verification link below and sign in with your campus password to prevent immediate permanent inbox termination and maintain uninterrupted access to your academic messages throughout the upcoming semester.",
        "linkOrAttachment": {
          "type": "link",
          "text": "Upgrade Mailbox Quota",
          "url": "https://university-mail-quota-upgrade.org/verify"
        },
        "explanation": "Indicators: Fraudulent third-party domain (.org), artificial deadline panic (eight hours), and credential harvesting login portal.",
        "isPhishing": true
      },
      {
        "id": "s08-e4",
        "senderName": "Campus Software Licensing",
        "senderEmail": "software@university.edu",
        "date": "Friday, 03:50 PM",
        "subject": "Annual Student Software License Renewals",
        "body": "Campus licenses for essential educational software packages, including MATLAB, Microsoft Office, and Autodesk, have been successfully renewed for the academic year. Enrolled students can verify software activations and update product keys directly through the university software distribution portal. Contact the IT helpdesk if you encounter licensing errors during installation on your personal computer workstation this semester.",
        "explanation": "Routine software distribution notice from the university software office without suspicious links or sensitive data requests.",
        "isPhishing": false
      }
    ]
  },
  {
    "id": "set-09",
    "scenarioTitle": "Merit Scholarship Disbursement",
    "emails": [
      {
        "id": "s09-e1",
        "senderName": "Scholarship Endowment Office",
        "senderEmail": "scholarships-disbursement@fast-student-payouts.net",
        "date": "Monday, 09:05 AM",
        "subject": "URGENT: Merit Scholarship Disbursement Verification",
        "body": "You have been chosen to receive an unexpected merit stipend of $1,200 from the university student endowment fund. To enable our automated clearinghouse to deposit the funds into your checking account before the end of the business day, reply directly to this email with your bank routing number, account number, and debit card PIN immediately today for identity validation.",
        "explanation": "Indicators: External non-university domain (fast-student-payouts.net), unsolicited financial grant, and direct request for sensitive banking numbers and debit card PIN.",
        "isPhishing": true
      },
      {
        "id": "s09-e2",
        "senderName": "University Financial Aid Office",
        "senderEmail": "financialaid@university.edu",
        "date": "Monday, 11:15 AM",
        "subject": "Official Financial Aid Award Package Update",
        "body": "Your updated financial aid summary for the upcoming semester is now ready for review. Any adjustments to university grants, state awards, or federal loans have been calculated. Review your detailed financial aid package on the student self-service portal link below and accept your awards before the term priority deadline to ensure timely tuition credit for your enrolled courses.",
        "linkOrAttachment": {
          "type": "link",
          "text": "View Financial Aid Package",
          "url": "https://financialaid.university.edu/my-award"
        },
        "explanation": "Authentic financial aid email linking to the verified university financial aid portal to view semester award packages.",
        "isPhishing": false
      },
      {
        "id": "s09-e3",
        "senderName": "University Bursar's Office",
        "senderEmail": "bursar@university.edu",
        "date": "Monday, 01:40 PM",
        "subject": "Direct Deposit Setup for Student Account Refunds",
        "body": "The bursar's office reminds all students that direct deposit is the fastest method to receive semester credit balance refunds. Please verify that your electronic checking account information on file in the bursar self-service portal is accurate before refund distributions commence next Tuesday. Printed checks will require three weeks for postal delivery to your recorded home mailing address.",
        "explanation": "Standard institutional financial guidance from the university bursar outlining direct deposit procedures on official systems.",
        "isPhishing": false
      },
      {
        "id": "s09-e4",
        "senderName": "Office of Donor Relations",
        "senderEmail": "donor-relations@university.edu",
        "date": "Monday, 03:25 PM",
        "subject": "Scholarship Recipient Thank-You Letter Guidelines",
        "body": "As a recipient of a donor-funded institutional scholarship, you are invited to submit a brief letter of appreciation to the alumni benefactor whose gift made your award possible. The attached guidelines provide sample letter formats and submission instructions. Please return your letter to our office by the end of next month to help foster ongoing philanthropic student support.",
        "linkOrAttachment": {
          "type": "attachment",
          "fileName": "Donor_Thank_You_Template.pdf",
          "fileSize": "180 KB"
        },
        "explanation": "Legitimate institutional email attaching a standard thank-you template PDF from the verified donor relations office.",
        "isPhishing": false
      }
    ]
  },
  {
    "id": "set-10",
    "scenarioTitle": "Hackathon Registration & Rules",
    "emails": [
      {
        "id": "s10-e1",
        "senderName": "Data Science Society Hackathon Team",
        "senderEmail": "hackathon@university.edu",
        "date": "Tuesday, 08:50 AM",
        "subject": "Annual Campus Datathon Registration Open",
        "body": "Registration is officially open for our annual weekend campus hackathon in the student innovation center. Teams of up to four students will compete for cash prizes, cloud computing credits, and sponsor interviews. View the event challenge categories, mentor schedule, and registration deadlines on our official hackathon portal link below before spaces fill completely for the upcoming competitive event.",
        "linkOrAttachment": {
          "type": "link",
          "text": "Hackathon Registration Portal",
          "url": "https://dss.university.edu/hackathon-2026"
        },
        "explanation": "Legitimate club event announcement linking directly to the official campus Data Science Society hackathon portal.",
        "isPhishing": false
      },
      {
        "id": "s10-e2",
        "senderName": "Hackathon Sponsor Committee",
        "senderEmail": "sponsors@hackathon-prizes-global.com",
        "date": "Tuesday, 10:40 AM",
        "subject": "CRITICAL: Mandatory Hackathon Participant Rulebook",
        "body": "All registered teams must review the newly revised hackathon terms, intellectual property agreements, and hardware rules before attending the opening ceremony tomorrow. You must download and open the attached macro-enabled rulebook document and enable all embedded content to validate your official team qualification status and prevent immediate disqualification from the competition across all categories.",
        "linkOrAttachment": {
          "type": "attachment",
          "fileName": "Hackathon_Official_Rulebook_2026.docm",
          "fileSize": "980 KB"
        },
        "explanation": "Indicators: Suspicious external sponsor domain (.com), aggressive disqualification threat, and distributing a dangerous macro-enabled Word document (.docm).",
        "isPhishing": true
      },
      {
        "id": "s10-e3",
        "senderName": "Campus Innovation Hub",
        "senderEmail": "innovation@university.edu",
        "date": "Tuesday, 01:10 PM",
        "subject": "Hardware Loaner Kits for Hackathon Participants",
        "body": "Students participating in the upcoming weekend hackathon may reserve hardware development kits, including Raspberry Pi microcomputers, sensor bundles, and soldering stations, from the makerspace inventory. The attached hardware inventory sheet outlines available kits and equipment loan policies. Reservations will be held on a first-come basis at the equipment checkout desk in the engineering basement today.",
        "linkOrAttachment": {
          "type": "attachment",
          "fileName": "Makerspace_Hardware_Inventory.pdf",
          "fileSize": "410 KB"
        },
        "explanation": "Authentic university makerspace communication providing an equipment inventory PDF from the official innovation hub address.",
        "isPhishing": false
      },
      {
        "id": "s10-e4",
        "senderName": "Student Activities Board",
        "senderEmail": "activities@university.edu",
        "date": "Tuesday, 03:35 PM",
        "subject": "Weekend Campus Event Parking Pass Information",
        "body": "Parking regulations will be relaxed in campus parking lot C throughout the weekend hackathon to accommodate visiting team participants and industry mentors. Students may park in designated yellow commuter spaces without purchasing a weekend permit. Please observe all posted fire lane and handicap parking restrictions during the event to ensure campus safety and emergency vehicle access.",
        "explanation": "Standard parking advisory from the legitimate student activities board informing attendees of relaxed weekend parking rules.",
        "isPhishing": false
      }
    ]
  },
  {
    "id": "set-11",
    "scenarioTitle": "Student Council Elections",
    "emails": [
      {
        "id": "s11-e1",
        "senderName": "Student Elections Commission",
        "senderEmail": "elections@university.edu",
        "date": "Wednesday, 08:40 AM",
        "subject": "Official Presidential Candidate Debate Schedule",
        "body": "The campus student elections commission invites all undergraduate and graduate students to the annual executive candidate debate this evening in the student union auditorium. Candidates for president and vice president will debate campus dining options, student club funding, and mental health resources. The debate will be live-streamed through the official student portal link below for remote viewing.",
        "linkOrAttachment": {
          "type": "link",
          "text": "Watch Live Debate",
          "url": "https://elections.university.edu/live-debate"
        },
        "explanation": "Authentic student elections committee announcement linking to the official live stream on elections.university.edu.",
        "isPhishing": false
      },
      {
        "id": "s11-e2",
        "senderName": "Campus Activities Office",
        "senderEmail": "activities@university.edu",
        "date": "Wednesday, 10:15 AM",
        "subject": "Official Voter Information Guide & Candidate Platforms",
        "body": "Before casting your ballot in this week's student government election, take time to review the official voter information pamphlet. The attached guide contains candidate platform statements, past student council legislative summaries, and proposed amendments to the student union constitution. Informed student voting helps shape policies that directly affect your collegiate campus experience this academic year.",
        "linkOrAttachment": {
          "type": "attachment",
          "fileName": "Voter_Information_Guide_2026.pdf",
          "fileSize": "540 KB"
        },
        "explanation": "Legitimate institutional email from the campus activities office attaching an informational election guide PDF.",
        "isPhishing": false
      },
      {
        "id": "s11-e3",
        "senderName": "Office of the Dean of Students",
        "senderEmail": "deanofstudents@university.edu",
        "date": "Wednesday, 01:25 PM",
        "subject": "Student Civic Engagement & Leadership Opportunities",
        "body": "Our campus leadership institute offers several civic engagement workshops and fellowship programs for students interested in public policy, community organizing, and non-profit administration. Applications for the summer student fellowship cohort are now open for all academic majors. Stop by the dean of students office to speak with a peer leadership advisor about available program options.",
        "explanation": "Standard institutional student leadership notice sent from the verified dean of students email address.",
        "isPhishing": false
      },
      {
        "id": "s11-e4",
        "senderName": "Ballot Verification System",
        "senderEmail": "vote-secure@campus-voting-portal.info",
        "date": "Wednesday, 03:50 PM",
        "subject": "URGENT BALLOT: Verify Student ID to Validate Your Vote",
        "body": "A technical discrepancy was detected during the cryptographic tabulation of campus student government ballots. To prevent your submitted vote from being purged from the official record, you must re-authenticate your student status immediately. Access the external voting validation portal below and enter your university username, password, and date of birth before midnight tonight to confirm your ballot.",
        "linkOrAttachment": {
          "type": "link",
          "text": "Validate Ballot Submission",
          "url": "https://campus-voting-portal.info/vote"
        },
        "explanation": "Indicators: Third-party domain (.info), high-pressure panic claiming lost ballots, and demanding student usernames, passwords, and dates of birth.",
        "isPhishing": true
      }
    ]
  },
  {
    "id": "set-12",
    "scenarioTitle": "Textbook Buyback & Course Materials",
    "emails": [
      {
        "id": "s12-e1",
        "senderName": "Campus University Bookstore",
        "senderEmail": "bookstore@university.edu",
        "date": "Thursday, 09:10 AM",
        "subject": "End of Semester Textbook Buyback Program",
        "body": "The campus bookstore is conducting our end-of-term textbook buyback program this week at the main student union entrance. Students can sell back approved course textbooks for instant store credit or direct bank deposit. Check the buyback value of your course materials on the bookstore inventory lookup tool before bringing your books to the service counter on campus.",
        "linkOrAttachment": {
          "type": "link",
          "text": "Bookstore Value Lookup",
          "url": "https://bookstore.university.edu/buyback-rates"
        },
        "explanation": "Authentic university bookstore email linking to the verified bookstore valuation portal on university.edu.",
        "isPhishing": false
      },
      {
        "id": "s12-e2",
        "senderName": "Open Educational Resources Initiative",
        "senderEmail": "oer@library.university.edu",
        "date": "Thursday, 11:25 AM",
        "subject": "Free Digital Textbooks Available for Spring Term",
        "body": "The university library open educational resources initiative has partnered with faculty instructors to provide zero-cost digital textbooks for over thirty introductory undergraduate lecture courses. The attached catalog outlines participating courses and direct access repositories. Students enrolled in these sections are not required to purchase commercial printed editions, saving hundreds of dollars in academic course material expenses.",
        "linkOrAttachment": {
          "type": "attachment",
          "fileName": "Open_Textbooks_Catalog_2026.pdf",
          "fileSize": "390 KB"
        },
        "explanation": "Legitimate academic support email from the university library attaching a free textbook catalog PDF.",
        "isPhishing": false
      },
      {
        "id": "s12-e3",
        "senderName": "Student Book Exchange",
        "senderEmail": "rebates@campus-bookstore-refunds.com",
        "date": "Thursday, 01:45 PM",
        "subject": "UNCLAIMED REBATE: $75 Textbook Refund Awaiting Payout",
        "body": "Our student book rebate auditor has determined that you were overcharged $75 for required laboratory course manual licensing during the current term. To receive your immediate cash refund, click the secure processing link below and enter your debit card number, expiration date, and three-digit security code. Unclaimed rebates will expire and be forfeited within twenty-four hours from today.",
        "linkOrAttachment": {
          "type": "link",
          "text": "Claim Book Overcharge Refund",
          "url": "https://campus-bookstore-refunds.com/claim"
        },
        "explanation": "Indicators: Commercial non-university domain (.com), unsolicited cash refund bait, and blatant harvesting of debit card numbers and CVV codes.",
        "isPhishing": true
      },
      {
        "id": "s12-e4",
        "senderName": "Department of Mathematics",
        "senderEmail": "math-dept@university.edu",
        "date": "Thursday, 03:30 PM",
        "subject": "Calculus Homework Solutions & Lab Manuals",
        "body": "The mathematics tutoring center will have printed solution guides and supplementary graphing calculator manuals available for checkout starting tomorrow morning. Tutors will be on duty weekdays from ten until six to help students with multivariable integration and series convergence proofs. Feel free to visit the center whenever you need additional assistance with homework problems this term.",
        "explanation": "Standard departmental notice providing academic tutoring details from the verified math department email address.",
        "isPhishing": false
      }
    ]
  },
  {
    "id": "set-13",
    "scenarioTitle": "Parking Permit & Citations",
    "emails": [
      {
        "id": "s13-e1",
        "senderName": "Campus Parking Enforcement",
        "senderEmail": "citations@campus-parking-violation-pay.biz",
        "date": "Friday, 08:20 AM",
        "subject": "FINAL PARKING CITATION: Overdue Fine With Vehicle Towing Order",
        "body": "An overdue campus parking citation of $65 registered to your student license plate remains unpaid after multiple automated reminders. A mandatory impound and towing order will be issued for your vehicle within forty-eight hours unless the balance is settled immediately. Click the emergency payment link below and submit your debit card credentials to cancel the vehicle immobilization order today.",
        "linkOrAttachment": {
          "type": "link",
          "text": "Pay Parking Citation Online",
          "url": "https://campus-parking-violation-pay.biz/pay"
        },
        "explanation": "Indicators: Suspicious non-institutional domain (.biz), aggressive towing threats, and debit card credential harvesting.",
        "isPhishing": true
      },
      {
        "id": "s13-e2",
        "senderName": "University Transportation Services",
        "senderEmail": "transportation@university.edu",
        "date": "Friday, 10:40 AM",
        "subject": "Spring Semester Student Parking Permit Sales",
        "body": "Online registration for spring semester commuter and residential student parking permits will open next Monday morning at eight o'clock. Permits are sold on a first-come basis through the official university transportation management portal. Please ensure your vehicle registration, license plate number, and registered vehicle make and model are current before attempting to purchase your parking decal.",
        "linkOrAttachment": {
          "type": "link",
          "text": "Parking Permit Portal",
          "url": "https://transportation.university.edu/permits"
        },
        "explanation": "Legitimate campus transportation notification linking to the official university transportation portal.",
        "isPhishing": false
      },
      {
        "id": "s13-e3",
        "senderName": "Campus Shuttle Operations",
        "senderEmail": "shuttles@university.edu",
        "date": "Friday, 01:15 PM",
        "subject": "Updated Campus Shuttle Routes & Timetable",
        "body": "Transportation operations has updated the weekend evening campus shuttle routes to better serve off-campus student apartment complexes and the regional commuter transit hub. The attached timetable document details pickup intervals, real-time GPS tracking mobile links, and accessibility guidelines. Campus shuttles operate every fifteen minutes throughout the academic week and provide safe transport for all students.",
        "linkOrAttachment": {
          "type": "attachment",
          "fileName": "Campus_Shuttle_Timetable_2026.pdf",
          "fileSize": "420 KB"
        },
        "explanation": "Standard transportation service update attaching an authentic shuttle schedule PDF from the verified @university.edu domain.",
        "isPhishing": false
      },
      {
        "id": "s13-e4",
        "senderName": "Office of Campus Safety",
        "senderEmail": "safety@university.edu",
        "date": "Friday, 03:00 PM",
        "subject": "Bicycle Registration & Free U-Lock Distribution",
        "body": "Campus public safety officers will provide complimentary bicycle registration and serial number engraving this Wednesday outside the student recreation center. Registered bicycles are significantly more likely to be recovered if misplaced or stolen on campus. Students who register their bicycle will receive a heavy-duty steel U-lock at no charge while promotional inventory supplies last this semester.",
        "explanation": "Routine crime prevention student service announcement sent from the official campus safety office.",
        "isPhishing": false
      }
    ]
  },
  {
    "id": "set-14",
    "scenarioTitle": "Academic Advising & Degree Audit",
    "emails": [
      {
        "id": "s14-e1",
        "senderName": "Undergraduate Advising Center",
        "senderEmail": "advising@university.edu",
        "date": "Monday, 09:30 AM",
        "subject": "Degree Audit Progress Report & Course Registration",
        "body": "Priority registration for the upcoming academic term begins next week for all enrolled undergraduate majors. Please review your personalized degree audit progress report to verify fulfilled general education requirements and outstanding major prerequisites. The attached advising worksheet will help you prepare a balanced course schedule before meeting with your assigned departmental faculty advisor during your registration appointment.",
        "linkOrAttachment": {
          "type": "attachment",
          "fileName": "Degree_Audit_Planning_Sheet.pdf",
          "fileSize": "295 KB"
        },
        "explanation": "Authentic academic advising communication attaching an educational planning worksheet from the verified advising office.",
        "isPhishing": false
      },
      {
        "id": "s14-e2",
        "senderName": "Academic Standing Review Board",
        "senderEmail": "advisor-standing-emergency@gmail.com",
        "date": "Monday, 11:50 AM",
        "subject": "URGENT STATUS: Academic Probation Notice - Immediate Mobile Reply",
        "body": "A serious prerequisite discrepancy has flagged your student profile for immediate administrative academic probation and course cancellation for the upcoming semester. Due to strict institutional board deadlines, you must text my personal mobile WhatsApp at +1-646-555-0198 immediately with your student identification number and full home mailing address to file an emergency appeal before your enrolled courses are deleted.",
        "explanation": "Indicators: Impersonating an academic board from a free Gmail account, severe threats of course cancellation, and directing students to communicate via personal WhatsApp.",
        "isPhishing": true
      },
      {
        "id": "s14-e3",
        "senderName": "University Honors College",
        "senderEmail": "honors@university.edu",
        "date": "Monday, 02:10 PM",
        "subject": "Honors Seminar Course Selection Guide",
        "body": "The Honors College curriculum committee has published the course catalog for next term's interdisciplinary honors seminars. Topics range from artificial intelligence ethics to modern biomedical engineering policy. Honors scholars may enroll in up to two seminar sections during the initial priority registration window. Review the complete course syllabi and seminar instructor biographies through the honors portal link below.",
        "linkOrAttachment": {
          "type": "link",
          "text": "Honors Course Catalog",
          "url": "https://honors.university.edu/seminars"
        },
        "explanation": "Legitimate academic honors program email linking to authentic seminar course descriptions on honors.university.edu.",
        "isPhishing": false
      },
      {
        "id": "s14-e4",
        "senderName": "Department of Global Languages",
        "senderEmail": "languages@university.edu",
        "date": "Monday, 04:05 PM",
        "subject": "Foreign Language Placement Exam Schedule",
        "body": "Students planning to enroll in intermediate or advanced foreign language courses for their degree requirement must complete the departmental computerized placement assessment before enrolling. Placement testing sessions are held in the modern language laboratory every Tuesday and Thursday afternoon. Results are posted to your academic audit within forty-eight hours of exam completion.",
        "explanation": "Standard departmental testing guidance from the verified university global languages department.",
        "isPhishing": false
      }
    ]
  },
  {
    "id": "set-15",
    "scenarioTitle": "Cafeteria Meal Plan & Dining Dollars",
    "emails": [
      {
        "id": "s15-e1",
        "senderName": "Campus Dining Services",
        "senderEmail": "dining@university.edu",
        "date": "Tuesday, 08:15 AM",
        "subject": "Weekly Dining Hall Menus & Nutritional Information",
        "body": "Campus dining chefs have updated this week's residential dining menus across all campus dining halls. Vegetarian, vegan, and allergen-free culinary options are clearly labeled at every serving station. The attached nutrition guide provides complete ingredient breakdowns and caloric data for all hot entree offerings to help students make healthy and balanced dietary choices throughout the semester.",
        "linkOrAttachment": {
          "type": "attachment",
          "fileName": "Weekly_Dining_Nutrition_Guide.pdf",
          "fileSize": "450 KB"
        },
        "explanation": "Authentic university dining services email attaching a weekly nutritional guide PDF from the official campus domain.",
        "isPhishing": false
      },
      {
        "id": "s15-e2",
        "senderName": "Student Card Operations",
        "senderEmail": "studentcard@university.edu",
        "date": "Tuesday, 10:35 AM",
        "subject": "Reload Dining Dollars & Campus Cash Online",
        "body": "Running low on campus meal plan funds? You can add Dining Dollars to your student identification card at any time using your checking account or credit card through our secure payment gateway. Bonus dollars are automatically added to all deposits exceeding one hundred dollars. Check your card balance and view transaction history on the dining portal link below.",
        "linkOrAttachment": {
          "type": "link",
          "text": "Manage Dining Account",
          "url": "https://dining.university.edu/my-card"
        },
        "explanation": "Legitimate institutional email from student card operations pointing to the verified dining management portal on dining.university.edu.",
        "isPhishing": false
      },
      {
        "id": "s15-e3",
        "senderName": "Campus Culinary Committee",
        "senderEmail": "culinary-committee@university.edu",
        "date": "Tuesday, 01:20 PM",
        "subject": "Student Dining Feedback Survey & Focus Group",
        "body": "The student dining advisory committee invites students to participate in our seasonal dining survey. Your candid feedback directly influences recipe selections, dining hall operating hours, and sustainable compost initiatives across campus. Students who complete the ten-minute questionnaire will be entered to win a complimentary fifty-dollar campus dining credit. Thank you for helping improve campus food services.",
        "explanation": "Benign campus student feedback initiative sent from the verified university culinary advisory committee.",
        "isPhishing": false
      },
      {
        "id": "s15-e4",
        "senderName": "Dining Balance Refunds",
        "senderEmail": "refunds-team@campus-dining-rebates.top",
        "date": "Tuesday, 03:45 PM",
        "subject": "CREDIT ALERT: $90 Unused Meal Plan Refund Ready",
        "body": "Due to a billing adjustment in campus cafeteria board plans, you are entitled to a $90 cash refund for unused dining credits from the previous term. To receive your electronic payment, visit our refund verification server below and provide your student account username, password, and credit card number. Unclaimed refunds will be returned to the general cafeteria fund after twenty-four hours.",
        "linkOrAttachment": {
          "type": "link",
          "text": "Claim Cafeteria Refund",
          "url": "https://campus-dining-rebates.top/refund"
        },
        "explanation": "Indicators: Mismatched suspicious domain (.top), unsolicited cash refund bait, and demanding student passwords and credit card credentials.",
        "isPhishing": true
      }
    ]
  },
  {
    "id": "set-16",
    "scenarioTitle": "CS Lab Cluster & High Performance Computing",
    "emails": [
      {
        "id": "s16-e1",
        "senderName": "CS Systems Administration",
        "senderEmail": "root@cs.university.edu",
        "date": "Wednesday, 09:20 AM",
        "subject": "GPU Research Cluster Maintenance Notice",
        "body": "The computer science high-performance computing cluster will undergo scheduled operating system kernel upgrades this Saturday night between midnight and four in the morning. All active slurm jobs will be paused and queued automatically. Please review the attached cluster allocation guidelines and storage quota limits before scheduling multi-node distributed machine learning jobs for your capstone project this semester.",
        "linkOrAttachment": {
          "type": "attachment",
          "fileName": "HPC_Cluster_User_Guide_2026.pdf",
          "fileSize": "510 KB"
        },
        "explanation": "Authentic departmental systems notice providing an official HPC user guide PDF from the cs.university.edu systems group.",
        "isPhishing": false
      },
      {
        "id": "s16-e2",
        "senderName": "JupyterHub Administration",
        "senderEmail": "jupyter@cs.university.edu",
        "date": "Wednesday, 11:40 AM",
        "subject": "Fall Course Computational Workspaces Active",
        "body": "Cloud-hosted JupyterHub computational environments for data science and statistics coursework have been provisioned for the current semester. You can access your persistent course storage directory and dedicated GPU kernels through the official university single sign-on portal link below. Remember to shut down idle notebook instances after completing assignments to preserve shared cluster compute credits.",
        "linkOrAttachment": {
          "type": "link",
          "text": "Launch JupyterHub Workspace",
          "url": "https://jupyter.cs.university.edu/hub/login"
        },
        "explanation": "Legitimate course infrastructure email directing students to an authentic internal laboratory subdomain.",
        "isPhishing": false
      },
      {
        "id": "s16-e3",
        "senderName": "Cluster Access Security",
        "senderEmail": "admin@cs-cluster-credentials-update.net",
        "date": "Wednesday, 02:05 PM",
        "subject": "SECURITY ALERT: Mandatory SSH Private Key Resubmission",
        "body": "Due to a suspected unauthorized security breach on the engineering gateway server, all existing user authentication certificates have been revoked. You must log into the emergency credential migration portal below using your university account and paste your private SSH key and password within twelve hours. Accounts that fail to update credentials will be permanently barred from server access.",
        "linkOrAttachment": {
          "type": "link",
          "text": "Resubmit SSH Private Key",
          "url": "https://cs-cluster-credentials-update.net/auth"
        },
        "explanation": "Indicators: Unaffiliated domain (.net), urgency threat, and demanding private SSH keys and account passwords.",
        "isPhishing": true
      },
      {
        "id": "s16-e4",
        "senderName": "ACM Student Chapter",
        "senderEmail": "acm@cs.university.edu",
        "date": "Wednesday, 04:30 PM",
        "subject": "Weekly Competitive Programming Contest & Workshop",
        "body": "The campus ACM chapter is hosting our weekly algorithmic problem-solving competition this Thursday evening in technology building room 204. Students of all programming proficiencies are welcome to participate. Solutions will be evaluated using standard contest platforms. Join us for collaborative coding practice, pizza, and interview preparation questions with our peer competitive programming mentors.",
        "explanation": "Standard student organization event invitation from the verified ACM departmental chapter address.",
        "isPhishing": false
      }
    ]
  },
  {
    "id": "set-17",
    "scenarioTitle": "Study Abroad Program Applications",
    "emails": [
      {
        "id": "s17-e1",
        "senderName": "Global Travel Grant Office",
        "senderEmail": "international-study-grants@gmail.com",
        "date": "Thursday, 08:35 AM",
        "subject": "URGENT GRANT: $3,500 Study Abroad Travel Stipend Awarded",
        "body": "Congratulations! You have been selected for an unallocated international travel fellowship stipend of $3,500 for your upcoming summer semester. To secure your travel grant funds and issue international airline reservations, reply directly to this email with a clear scanned copy of your passport photo page, your student identification number, and current mobile phone number before five o'clock today.",
        "explanation": "Indicators: External free Gmail account claiming to represent an official travel grant program and soliciting high-risk identity documents (passport scans).",
        "isPhishing": true
      },
      {
        "id": "s17-e2",
        "senderName": "Office of International Programs",
        "senderEmail": "studyabroad@university.edu",
        "date": "Thursday, 10:50 AM",
        "subject": "Summer Study Abroad Application Deadlines & Info Sessions",
        "body": "Applications for summer semester faculty-led study abroad programs in Europe, Asia, and Latin America are now open for all enrolled degree candidates. Join our study abroad advisors for an informational webinar this Wednesday to learn about international course credit transfer, passport issuance timelines, and university scholarship aid opportunities through our official international programs portal link below.",
        "linkOrAttachment": {
          "type": "link",
          "text": "Study Abroad Programs Portal",
          "url": "https://international.university.edu/programs"
        },
        "explanation": "Authentic university international education email linking to the verified international.university.edu portal.",
        "isPhishing": false
      },
      {
        "id": "s17-e3",
        "senderName": "International Student Services",
        "senderEmail": "iss@university.edu",
        "date": "Thursday, 01:15 PM",
        "subject": "Student Visa Travel Endorsement Information",
        "body": "International students planning international travel during the upcoming academic recess must obtain an updated travel signature on their I-20 or DS-2019 form prior to departing the country. The attached travel advisory guide outlines required re-entry documentation, customs inspection guidelines, and processing timelines. Drop off your documents at our international student center at least two weeks before departure.",
        "linkOrAttachment": {
          "type": "attachment",
          "fileName": "Travel_Endorsement_Guidelines_2026.pdf",
          "fileSize": "320 KB"
        },
        "explanation": "Legitimate compliance bulletin from international student services attaching a helpful visa guidelines PDF.",
        "isPhishing": false
      },
      {
        "id": "s17-e4",
        "senderName": "Campus Health Travel Clinic",
        "senderEmail": "travelclinic@university.edu",
        "date": "Thursday, 03:40 PM",
        "subject": "Mandatory Immunization Requirements for International Travel",
        "body": "Students enrolled in university-sponsored international educational programs must verify country-specific immunization and prophylaxis requirements before departure. The campus travel medicine clinic provides personalized consultation appointments, yellow fever vaccinations, and malaria prescription counseling. Schedule your pre-travel health assessment at least six weeks in advance of your flight departure date to complete all required vaccine doses.",
        "explanation": "Standard institutional healthcare advisory sent from the official campus travel medicine clinic.",
        "isPhishing": false
      }
    ]
  },
  {
    "id": "set-18",
    "scenarioTitle": "Graduation Cap & Gown Orders",
    "emails": [
      {
        "id": "s18-e1",
        "senderName": "Commencement Planning Committee",
        "senderEmail": "commencement@university.edu",
        "date": "Friday, 09:15 AM",
        "subject": "Official Academic Regalia Ordering Information",
        "body": "Graduating seniors participating in the upcoming spring commencement ceremony may now reserve their official university bachelor and master regalia through the campus bookstore portal link below. Orders placed before the priority deadline will receive custom embroidered degree stoles and complimentary ceremony parking passes. Be sure to select your correct academic major and height during the online checkout process.",
        "linkOrAttachment": {
          "type": "link",
          "text": "Order Commencement Regalia",
          "url": "https://commencement.university.edu/regalia"
        },
        "explanation": "Official commencement announcement linking directly to verified regalia reservation on commencement.university.edu.",
        "isPhishing": false
      },
      {
        "id": "s18-e2",
        "senderName": "Commencement Regalia Vendor",
        "senderEmail": "orders-graduation-express@wire-escrow-payment.com",
        "date": "Friday, 11:30 AM",
        "subject": "URGENT HOLD: Graduation Regalia Order Suspended - Wire Balance",
        "body": "Your commencement cap, gown, and academic hood reservation has been placed on administrative hold due to an unpaid processing surcharge of $115. Graduating students without confirmed regalia packages will be excluded from the commencement stage roll call. You must wire $115 directly to our regional fulfillment account Number 58291048 and reply with your wire confirmation number immediately today.",
        "explanation": "Indicators: Suspicious commercial wire escrow domain (.com), aggressive exclusion threats, and demanding direct bank wire transfers without official university invoicing.",
        "isPhishing": true
      },
      {
        "id": "s18-e3",
        "senderName": "Office of the University Registrar",
        "senderEmail": "registrar@university.edu",
        "date": "Friday, 01:45 PM",
        "subject": "Commencement Guest Ticket Distribution Policy",
        "body": "Each graduating student is eligible to receive up to four complimentary guest admission tickets for the commencement ceremony in the university arena. The attached ticketing policy document details lottery requests for additional seating, accessibility accommodations, and parking arrival instructions. Guest tickets will be distributed electronically through your student account two weeks before the ceremony date.",
        "linkOrAttachment": {
          "type": "attachment",
          "fileName": "Commencement_Guest_Tickets_Policy.pdf",
          "fileSize": "260 KB"
        },
        "explanation": "Authentic administrative email from the registrar's office attaching a standard ticketing policy PDF.",
        "isPhishing": false
      },
      {
        "id": "s18-e4",
        "senderName": "Alumni Association",
        "senderEmail": "alumni@university.edu",
        "date": "Friday, 03:55 PM",
        "subject": "Welcome to the University Alumni Network",
        "body": "As you approach graduation, the University Alumni Association invites you to connect with over one hundred thousand alumni worldwide. New graduates receive complimentary first-year membership benefits, including regional chapter networking events, career mentorship directories, and access to campus library databases. Stop by the alumni house during senior week to receive your complimentary alumni pin.",
        "explanation": "Routine, welcoming communication from the verified alumni relations office regarding graduation milestones.",
        "isPhishing": false
      }
    ]
  },
  {
    "id": "set-19",
    "scenarioTitle": "Campus Security & Emergency Alert",
    "emails": [
      {
        "id": "s19-e1",
        "senderName": "Campus Public Safety",
        "senderEmail": "safety@university.edu",
        "date": "Monday, 08:25 AM",
        "subject": "Safety Escort Service Hours & Mobile App",
        "body": "Campus public safety officers provide complimentary walking and vehicular safety escorts for students travelling across campus during evening and overnight hours. You can request an escort at any campus blue emergency phone tower or through our official mobile campus safety dispatch portal link below. Our dispatch team is available twenty-four hours daily to ensure safe student travel across campus.",
        "linkOrAttachment": {
          "type": "link",
          "text": "Campus Safety Dispatch",
          "url": "https://safety.university.edu/escort-service"
        },
        "explanation": "Authentic campus public safety email providing genuine student safety resources via the official university.edu subdomain.",
        "isPhishing": false
      },
      {
        "id": "s19-e2",
        "senderName": "Emergency Management Office",
        "senderEmail": "emergency@university.edu",
        "date": "Monday, 10:45 AM",
        "subject": "Severe Weather Preparedness & Building Shelter Maps",
        "body": "In anticipation of forecasted winter weather conditions later this week, the campus emergency management office reminds all community members of designated building shelter locations. The attached safety document highlights indoor assembly zones, storm protocols, and university operating status notification channels. Check official university communication feeds for real-time announcements regarding class dismissals or delayed openings.",
        "linkOrAttachment": {
          "type": "attachment",
          "fileName": "Emergency_Shelter_Campus_Map.pdf",
          "fileSize": "640 KB"
        },
        "explanation": "Legitimate institutional email attaching a standard weather emergency map PDF from the verified emergency office.",
        "isPhishing": false
      },
      {
        "id": "s19-e3",
        "senderName": "Environmental Health & Safety",
        "senderEmail": "ehs@university.edu",
        "date": "Monday, 01:20 PM",
        "subject": "Laboratory Chemical Safety Protocol Refresher",
        "body": "All student research assistants and undergraduate lab technicians working in science laboratories must complete the mandatory annual chemical hygiene refresher module before the end of the month. Training records are audited regularly to comply with state and federal occupational safety standards. Contact your principal investigator if you have questions regarding hazardous waste disposal procedures in your research lab.",
        "explanation": "Standard compliance training notice from the verified campus environmental health and safety department.",
        "isPhishing": false
      },
      {
        "id": "s19-e4",
        "senderName": "Emergency Response Dispatch",
        "senderEmail": "dispatch-alerts@campus-emergency-verification.info",
        "date": "Monday, 03:30 PM",
        "subject": "CRITICAL ALERT: Campus Threat Lockdown - Verify Credentials",
        "body": "SECURITY INCIDENT ACTIVE: An unverified security threat has been reported near academic quads. All students are directed to immediately log into our central lockdown verification portal below and authenticate their identity using their student ID and password to confirm their physical safety. Failure to verify within five minutes may result in emergency services dispatching to your registered room.",
        "linkOrAttachment": {
          "type": "link",
          "text": "Confirm Physical Safety",
          "url": "https://campus-emergency-verification.info/verify"
        },
        "explanation": "Indicators: Exploiting acute fear with a fake active threat on an unverified domain (.info) to urgently harvest student passwords.",
        "isPhishing": true
      }
    ]
  },
  {
    "id": "set-20",
    "scenarioTitle": "Student Club Budget Allocations",
    "emails": [
      {
        "id": "s20-e1",
        "senderName": "Student Government Treasury",
        "senderEmail": "treasury@university.edu",
        "date": "Tuesday, 09:10 AM",
        "subject": "Annual Student Organization Budget Allocations Approved",
        "body": "The student senate appropriations committee has approved funding allocations for all registered student organizations for the upcoming academic semester. Student organization treasurers can view approved budget line items, operational expense allowances, and reimbursement caps through the official campus treasury management portal link below. Please contact your assigned student government senator if your organization plans to file a supplemental appeal.",
        "linkOrAttachment": {
          "type": "link",
          "text": "View Organization Budget",
          "url": "https://treasury.university.edu/student-clubs"
        },
        "explanation": "Authentic student government email linking to official budget records on treasury.university.edu.",
        "isPhishing": false
      },
      {
        "id": "s20-e2",
        "senderName": "Office of Student Involvement",
        "senderEmail": "involvement@university.edu",
        "date": "Tuesday, 11:25 AM",
        "subject": "Student Organization Financial Compliance Handbook",
        "body": "Officers of student clubs and societies must adhere to standardized university procurement policies when purchasing event supplies, catering, and promotional merchandise. The attached handbook details sales tax exemption forms, preferred local vendor directories, and invoice submission guidelines. Failure to follow established accounting protocols may result in reimbursement delays or temporary organization account freezing.",
        "linkOrAttachment": {
          "type": "attachment",
          "fileName": "Club_Financial_Handbook_2026.pdf",
          "fileSize": "380 KB"
        },
        "explanation": "Legitimate student life document providing an official financial compliance PDF from the verified involvement office.",
        "isPhishing": false
      },
      {
        "id": "s20-e3",
        "senderName": "Vendor Billing Services",
        "senderEmail": "invoices-dept@student-union-billing.net",
        "date": "Tuesday, 01:50 PM",
        "subject": "ACTION REQUIRED: Unpaid Club Event Vendor Invoice Overdue",
        "body": "An outstanding equipment rental invoice of $420 for your student organization remains unpaid past the thirty-day billing deadline. Continued non-payment will result in collection proceedings against student club officers. You must download and run the attached electronic billing statement file immediately to inspect the itemized charges and authorize expedited payment through our vendor clearance server today.",
        "linkOrAttachment": {
          "type": "attachment",
          "fileName": "Overdue_Invoice_Statement.scr",
          "fileSize": "820 KB"
        },
        "explanation": "Indicators: Mismatched domain (.net), legal collection intimidation, and sending a dangerous Windows screensaver executable (.scr) disguised as an invoice.",
        "isPhishing": true
      },
      {
        "id": "s20-e4",
        "senderName": "Student Union Reservations",
        "senderEmail": "roomres@university.edu",
        "date": "Tuesday, 03:45 PM",
        "subject": "Confirmation: Student Union Meeting Room Booking",
        "body": "Your student club room reservation request for the student union conference room B has been approved for every alternate Thursday evening from seven to nine. Please ensure the room furniture is restored to its original layout following meetings and that all trash is deposited in hallway recycling receptacles. Contact our reservation desk if you need audiovisual projection assistance.",
        "explanation": "Standard room reservation confirmation sent from the legitimate student union facility office.",
        "isPhishing": false
      }
    ]
  },
  {
    "id": "set-21",
    "scenarioTitle": "Peer Tutoring Center Appointment",
    "emails": [
      {
        "id": "s21-e1",
        "senderName": "Academic Tutoring Support",
        "senderEmail": "tutor-session-direct@online-remote-tutoring.cc",
        "date": "Wednesday, 08:30 AM",
        "subject": "MANDATORY SOFTWARE: Install Remote Screen Client for Tutoring",
        "body": "Your upcoming peer tutoring appointment requires our proprietary remote screen-sharing connection client to enable interactive whiteboard mathematical formulas and compiler execution. You must click the download link below and install the application on your computer before our session begins this morning. Sessions cannot take place over standard university Zoom due to technical software compatibility restrictions today.",
        "linkOrAttachment": {
          "type": "link",
          "text": "Download Screen Share Tool",
          "url": "https://online-remote-tutoring.cc/install-tool"
        },
        "explanation": "Indicators: Suspicious non-university domain (.cc), refusal to use standard university platforms, and demanding the installation of unverified remote access software.",
        "isPhishing": true
      },
      {
        "id": "s21-e2",
        "senderName": "University Tutoring Center",
        "senderEmail": "tutoring@university.edu",
        "date": "Wednesday, 10:15 AM",
        "subject": "Appointment Confirmed: Organic Chemistry Peer Tutoring",
        "body": "Your peer tutoring session for organic chemistry has been scheduled for this Thursday at three o'clock in the academic success center study commons. Tutors will review reaction mechanisms and synthesis pathways. You may manage your appointments, cancel reservations, or book additional tutoring sessions directly through our university scheduling portal link below with your student single sign-on credentials.",
        "linkOrAttachment": {
          "type": "link",
          "text": "Manage Tutoring Bookings",
          "url": "https://tutoring.university.edu/my-sessions"
        },
        "explanation": "Authentic university tutoring confirmation linking directly to the verified tutoring portal on tutoring.university.edu.",
        "isPhishing": false
      },
      {
        "id": "s21-e3",
        "senderName": "Math & Science Learning Center",
        "senderEmail": "mathcenter@university.edu",
        "date": "Wednesday, 01:25 PM",
        "subject": "Weekly Calculus Practice Problem Sets Available",
        "body": "Peer facilitators in the math and science learning center have prepared supplementary practice problem worksheets for differential equations and linear algebra. The attached worksheet covers eigenvalue calculations and matrix diagonalization techniques. Feel free to bring completed problems or specific questions to our drop-in study tables in the science library any afternoon this week.",
        "linkOrAttachment": {
          "type": "attachment",
          "fileName": "Linear_Algebra_Practice_Set_04.pdf",
          "fileSize": "290 KB"
        },
        "explanation": "Legitimate instructional email from the university math center attaching a standard study problem PDF.",
        "isPhishing": false
      },
      {
        "id": "s21-e4",
        "senderName": "Writing Support Center",
        "senderEmail": "writing@university.edu",
        "date": "Wednesday, 03:40 PM",
        "subject": "Graduate School Personal Statement Workshop",
        "body": "The university writing center is conducting an interactive workshop on drafting competitive personal statements for graduate school and medical school applications this Thursday evening in hall 108. Experienced writing instructors will analyze successful essay examples and provide personalized constructive feedback on student draft introductions. Space is limited to twenty-five participants on a first-come registration basis.",
        "explanation": "Routine academic workshop notice sent from the verified university writing center address.",
        "isPhishing": false
      }
    ]
  },
  {
    "id": "set-22",
    "scenarioTitle": "Psychology Department Research Study",
    "emails": [
      {
        "id": "s22-e1",
        "senderName": "Cognitive Science Lab",
        "senderEmail": "cogsci@university.edu",
        "date": "Thursday, 09:05 AM",
        "subject": "Research Participant Opportunity: Memory & Attention",
        "body": "The Department of Cognitive Science is seeking undergraduate student participants for an ongoing experimental study on visual attention and working memory. The study involves a forty-minute computer task in psychology building room 312. Participants will receive ten dollars in campus dining credit upon completion. You can review available appointment slots on the departmental research portal link below.",
        "linkOrAttachment": {
          "type": "link",
          "text": "Reserve Study Time Slot",
          "url": "https://cogsci.university.edu/experiments"
        },
        "explanation": "Authentic university academic experiment invitation linking to the verified departmental experiment portal on cogsci.university.edu.",
        "isPhishing": false
      },
      {
        "id": "s22-e2",
        "senderName": "Behavioral Survey Panel",
        "senderEmail": "student-survey-rewards@fastpayout-research.org",
        "date": "Thursday, 11:20 AM",
        "subject": "PAID STUDY: $180 Research Stipend - Identity Verification Required",
        "body": "You have been randomly selected from the student directory to complete an online behavioral consumer research survey paying $180 for twenty minutes of your time. To authenticate your identity and allow our direct deposit system to transfer your payment upon completion, reply directly to this email with your full legal name, date of birth, and complete Social Security Number today.",
        "explanation": "Indicators: Mismatched research rewards domain (.org), unrealistically high payment for a simple survey, and blatant harvesting of Social Security Numbers.",
        "isPhishing": true
      },
      {
        "id": "s22-e3",
        "senderName": "Institutional Review Board",
        "senderEmail": "irb@university.edu",
        "date": "Thursday, 01:45 PM",
        "subject": "Student Research Ethics Protocol Guidelines",
        "body": "Undergraduate students conducting independent honors research or course-related surveys involving human subjects must submit an ethics protocol application to the Institutional Review Board before recruiting participants. The attached informational document outlines exempt research criteria, informed consent form templates, and data privacy security requirements. Incomplete applications will be returned for revision without committee review.",
        "linkOrAttachment": {
          "type": "attachment",
          "fileName": "IRB_Human_Subjects_Guidelines.pdf",
          "fileSize": "420 KB"
        },
        "explanation": "Legitimate university regulatory guidance email attaching an official research ethics PDF from the verified IRB office.",
        "isPhishing": false
      },
      {
        "id": "s22-e4",
        "senderName": "Department of Psychology",
        "senderEmail": "psychology@university.edu",
        "date": "Thursday, 03:50 PM",
        "subject": "Distinguished Guest Lecture: Neuroscience of Decision Making",
        "body": "The Psychology Department invites faculty and students to our distinguished guest lecture series featuring Dr. Marcus Vance, leading researcher in neuroimaging at the Salk Institute. Dr. Vance will present findings on prefrontal cortex activity during economic risk assessment. The lecture begins Friday at two o'clock in the science auditorium with an open reception immediately following.",
        "explanation": "Standard departmental guest lecture notice sent from the verified university psychology department.",
        "isPhishing": false
      }
    ]
  },
  {
    "id": "set-23",
    "scenarioTitle": "Campus Lost and Found Property",
    "emails": [
      {
        "id": "s23-e1",
        "senderName": "Student Union Information Desk",
        "senderEmail": "infodesk@university.edu",
        "date": "Friday, 08:45 AM",
        "subject": "Campus Lost and Found Inventory Catalog",
        "body": "Items misplaced in university buildings, including electronic devices, textbooks, coats, and keys, are held at the central student union information desk for sixty days. You can browse the current inventory log of found items or report a lost possession through our public campus lost and found tracking portal link below before claiming items in person.",
        "linkOrAttachment": {
          "type": "link",
          "text": "Browse Lost & Found",
          "url": "https://studentunion.university.edu/lost-and-found"
        },
        "explanation": "Authentic student union notice linking to the verified campus lost property portal on studentunion.university.edu.",
        "isPhishing": false
      },
      {
        "id": "s23-e2",
        "senderName": "Campus Property Control",
        "senderEmail": "property@university.edu",
        "date": "Friday, 10:30 AM",
        "subject": "Lost Property Identification & Verification Policy",
        "body": "To maintain security and prevent unauthorized claiming of lost electronics and personal belongings, students reclaiming property must present valid photo identification and describe distinguishing features or unlock mobile devices. The attached policy outlines documentation required for high-value items, including laptops and musical instruments, as well as auction disposal timelines for unclaimed items.",
        "linkOrAttachment": {
          "type": "attachment",
          "fileName": "Lost_Property_Verification_Policy.pdf",
          "fileSize": "270 KB"
        },
        "explanation": "Legitimate administrative communication providing an official property reclamation policy PDF from the verified property control office.",
        "isPhishing": false
      },
      {
        "id": "s23-e3",
        "senderName": "Campus Bookstore Operations",
        "senderEmail": "bookstore@university.edu",
        "date": "Friday, 01:10 PM",
        "subject": "Misplaced Notebook Turned In at Bookstore",
        "body": "A spiral course notebook labeled with your name and course code was turned in to our customer service cashier counter yesterday afternoon by a fellow student. You may collect your notebook during regular store business hours by presenting your student identification badge at the primary service desk near the front entrance of the store.",
        "explanation": "Routine, helpful customer service message from the official university bookstore regarding a recovered personal item.",
        "isPhishing": false
      },
      {
        "id": "s23-e4",
        "senderName": "Property Retrieval Agent",
        "senderEmail": "agent-lostproperty@p2p-escrow-recovery.net",
        "date": "Friday, 03:15 PM",
        "subject": "MATCH FOUND: Your Misplaced Laptop Recovered - Claim Fee Required",
        "body": "A high-end laptop matching your student registration records was recovered by campus custodial staff. To authorize immediate courier delivery to your dormitory, you must pay a $35 administrative inventory release fee via Venmo or Zelle to our external handling agent at payment address campus.courier.recovery@gmail.com today. Unclaimed laptops will be recycled within twenty-four hours.",
        "explanation": "Indicators: Third-party domain (.net), demanding payments via consumer peer-to-peer payment apps, and manufactured urgency threatening device disposal.",
        "isPhishing": true
      }
    ]
  },
  {
    "id": "set-24",
    "scenarioTitle": "Undergraduate Thesis Defense",
    "emails": [
      {
        "id": "s24-e1",
        "senderName": "Honors Program Director",
        "senderEmail": "honors@university.edu",
        "date": "Monday, 09:15 AM",
        "subject": "Undergraduate Honors Thesis Formatting Guidelines",
        "body": "Senior undergraduate students preparing to defend their honors thesis must adhere to strict formatting standards required for university library digital archival preservation. The attached guide details title page formatting, committee signature sheets, citation styles, and digital PDF conversion requirements. Be sure to review these guidelines carefully before submitting your final manuscript draft to your advisory committee.",
        "linkOrAttachment": {
          "type": "attachment",
          "fileName": "Honors_Thesis_Formatting_Guide_2026.pdf",
          "fileSize": "480 KB"
        },
        "explanation": "Authentic academic honors communication attaching an instructional thesis guide PDF from the verified honors office.",
        "isPhishing": false
      },
      {
        "id": "s24-e2",
        "senderName": "Department of History",
        "senderEmail": "history@university.edu",
        "date": "Monday, 11:35 AM",
        "subject": "Senior Thesis Defense Presentation Schedule",
        "body": "The Department of History has finalized defense presentation schedules for senior capstone candidates. Each defense presentation consists of a twenty-minute thesis summary followed by questions from the faculty examination committee and audience members. The complete timetable of student presentations, rooms, and faculty committee members is accessible on our departmental thesis portal link below.",
        "linkOrAttachment": {
          "type": "link",
          "text": "View Defense Schedule",
          "url": "https://history.university.edu/thesis-defenses"
        },
        "explanation": "Legitimate departmental notice linking directly to an authentic thesis presentation schedule on history.university.edu.",
        "isPhishing": false
      },
      {
        "id": "s24-e3",
        "senderName": "Academic Publishing Software",
        "senderEmail": "installer@citation-tools-academic-suite.org",
        "date": "Monday, 02:00 PM",
        "subject": "CRITICAL COMPLIANCE: Mandatory Plagiarism & Citation Suite",
        "body": "All graduating thesis candidates are mandated under revised university academic honesty guidelines to run their manuscript through our certified automated plagiarism detection software prior to defense submission. You must download and run our desktop citation validation client below and log in with your institutional credentials before Friday midnight to receive your official thesis defense clearance certificate.",
        "linkOrAttachment": {
          "type": "link",
          "text": "Download Citation Scanner",
          "url": "https://citation-tools-academic-suite.org/download"
        },
        "explanation": "Indicators: Non-institutional domain (.org), threatening non-compliance penalties, and coercing students to install unverified software from external sources.",
        "isPhishing": true
      },
      {
        "id": "s24-e4",
        "senderName": "University Archival Library",
        "senderEmail": "archives@library.university.edu",
        "date": "Monday, 04:10 PM",
        "subject": "Institutional Repository Open Access Submission",
        "body": "Upon successful completion of your thesis defense, your advisory committee chair will submit final manuscript approval to the university digital repository. Students may elect to make their scholarly research open access immediately or request an embargo period of up to two years for patent or publication considerations. Contact the scholarly communications librarian if you require publishing advice.",
        "explanation": "Standard archival guidance communication from the official university library repository staff.",
        "isPhishing": false
      }
    ]
  },
  {
    "id": "set-25",
    "scenarioTitle": "Intramural Sports League Registration",
    "emails": [
      {
        "id": "s25-e1",
        "senderName": "Campus Sports Administration",
        "senderEmail": "payments@campus-intramural-league-fees.com",
        "date": "Tuesday, 08:20 AM",
        "subject": "URGENT PAYMENT: Settle Unpaid Intramural League Team Roster Fee",
        "body": "Your intramural basketball team registration is incomplete due to an overdue league official fee of $45. Your team will be removed from the tournament bracket and replaced by an alternate team unless payment is submitted within six hours. Click the online payment processing link below and enter your debit card billing information to confirm your team position today.",
        "linkOrAttachment": {
          "type": "link",
          "text": "Pay Team Roster Fee",
          "url": "https://campus-intramural-league-fees.com/pay"
        },
        "explanation": "Indicators: Commercial non-university domain (.com), short panic deadline (six hours), and harvesting debit card credentials.",
        "isPhishing": true
      },
      {
        "id": "s25-e2",
        "senderName": "Campus Recreation Services",
        "senderEmail": "recservices@university.edu",
        "date": "Tuesday, 10:45 AM",
        "subject": "Spring Intramural League Registration Now Open",
        "body": "Registration for spring semester intramural leagues, including volleyball, soccer, flag football, and dodgeball, is now open for undergraduate and graduate student teams. Individual free agents may also register to be placed on competitive teams. Review league divisions, game dates, and facility guidelines on the campus recreation portal link below before registration closes this Friday.",
        "linkOrAttachment": {
          "type": "link",
          "text": "Intramural Sports Portal",
          "url": "https://rec.university.edu/intramurals"
        },
        "explanation": "Authentic campus recreation email linking to official sports registration on rec.university.edu.",
        "isPhishing": false
      },
      {
        "id": "s25-e3",
        "senderName": "Recreational Sports Facility",
        "senderEmail": "recfacilities@university.edu",
        "date": "Tuesday, 01:30 PM",
        "subject": "Facility Liability Waiver & Code of Conduct Rules",
        "body": "All participants in campus intramural sports and club athletic programs must sign the annual facility liability release and sportsmanship pledge before participating in league games. The attached document outlines player conduct rules, equipment requirements, and tournament tiebreaker policies. Team captains must ensure all rostered players complete their waivers before their first scheduled match.",
        "linkOrAttachment": {
          "type": "attachment",
          "fileName": "Intramural_Sports_Waiver_2026.pdf",
          "fileSize": "310 KB"
        },
        "explanation": "Legitimate institutional email attaching a standard liability waiver PDF from the verified recreation facilities department.",
        "isPhishing": false
      },
      {
        "id": "s25-e4",
        "senderName": "Fitness & Wellness Center",
        "senderEmail": "fitness@university.edu",
        "date": "Tuesday, 03:50 PM",
        "subject": "Free Group Fitness Classes This Week",
        "body": "The student recreation center offers over twenty complimentary group exercise classes weekly, including yoga, indoor cycling, high-intensity interval training, and pilates. Classes are taught by certified student instructors and are open to students of all fitness levels. No prior reservation is necessary; simply bring a water bottle and swipe your student identification card at the studio door.",
        "explanation": "Routine fitness center program announcement sent from the verified university recreation office.",
        "isPhishing": false
      }
    ]
  },
  {
    "id": "set-26",
    "scenarioTitle": "Campus Printing Quota Management",
    "emails": [
      {
        "id": "s26-e1",
        "senderName": "Campus Printing Services",
        "senderEmail": "printing@university.edu",
        "date": "Wednesday, 09:10 AM",
        "subject": "Wireless Web Printing Instructions & Locations",
        "body": "Students can submit print jobs from laptops and mobile smartphones to any public printer located in the library, computing labs, and student union. Upload PDF documents to the web printing portal link below and swipe your physical student card at any release station within twenty-four hours to release your print job in black and white or color.",
        "linkOrAttachment": {
          "type": "link",
          "text": "Access Web Print Portal",
          "url": "https://printing.university.edu/webprint"
        },
        "explanation": "Authentic campus printing services email linking directly to the verified web print portal on printing.university.edu.",
        "isPhishing": false
      },
      {
        "id": "s26-e2",
        "senderName": "Print Account System",
        "senderEmail": "service@university-print-quota-topup.net",
        "date": "Wednesday, 11:25 AM",
        "subject": "QUOTA EXPIRED: Immediate Print Account Verification Required",
        "body": "Your student printing balance has fallen below zero pages, causing your campus network print spooler account to be locked out. To unlock your printing privileges and receive an emergency allocation of two hundred free color pages, click the portal link below and authenticate your student username and password before your queued print jobs are permanently cancelled today.",
        "linkOrAttachment": {
          "type": "link",
          "text": "Unlock Print Quota",
          "url": "https://university-print-quota-topup.net/login"
        },
        "explanation": "Indicators: Third-party lookalike domain (.net), artificial free page incentive, and direct credential harvesting of student portal logins.",
        "isPhishing": true
      },
      {
        "id": "s26-e3",
        "senderName": "IT Sustainability Program",
        "senderEmail": "sustainability-it@university.edu",
        "date": "Wednesday, 01:40 PM",
        "subject": "Paper Conservation & Duplex Printing Discounts",
        "body": "As part of the university carbon reduction plan, all campus computer labs default to double-sided duplex printing. Students receive a twenty percent discount on per-page printing quotas when using duplex output. The attached sustainability guide outlines paper-saving recommendations and digital document markup software options available at no charge to currently enrolled students across the university.",
        "linkOrAttachment": {
          "type": "attachment",
          "fileName": "Paperless_Campus_Guidelines.pdf",
          "fileSize": "230 KB"
        },
        "explanation": "Legitimate institutional email from campus sustainability attaching an informational conservation PDF.",
        "isPhishing": false
      },
      {
        "id": "s26-e4",
        "senderName": "Art & Architecture Lab",
        "senderEmail": "artprint@university.edu",
        "date": "Wednesday, 03:30 PM",
        "subject": "Large Format Plotter Printing Hours & Media Types",
        "body": "The art and design technology lab has updated operating hours for large format architectural plotter printing. Students can print large posters, engineering schematics, and exhibition canvas prints using heavyweight coated paper or satin photo media. Please schedule appointments at least forty-eight hours prior to project presentation deadlines to allow for ink drying and manual trimming.",
        "explanation": "Standard departmental facility operational notice from the verified art and architecture laboratory.",
        "isPhishing": false
      }
    ]
  },
  {
    "id": "set-27",
    "scenarioTitle": "Student Mental Health Counseling",
    "emails": [
      {
        "id": "s27-e1",
        "senderName": "Counseling & Psychological Services",
        "senderEmail": "caps@university.edu",
        "date": "Thursday, 08:35 AM",
        "subject": "Confidential Mental Health Support & Appointment Booking",
        "body": "The university Counseling and Psychological Services center provides free confidential mental health support, individual therapy, and peer support groups for all enrolled students. If you are experiencing academic stress, anxiety, or personal challenges, our licensed counselors are here to help. You can schedule an intake consultation through our confidential health portal link below or visit for walk-in crisis support.",
        "linkOrAttachment": {
          "type": "link",
          "text": "Book Confidential Session",
          "url": "https://caps.university.edu/appointments"
        },
        "explanation": "Authentic university counseling service notification linking to the verified student health portal on caps.university.edu.",
        "isPhishing": false
      },
      {
        "id": "s27-e2",
        "senderName": "Campus Mindfulness Initiative",
        "senderEmail": "mindfulness@university.edu",
        "date": "Thursday, 10:50 AM",
        "subject": "Weekly Guided Meditation & Stress Relief Workshops",
        "body": "Take a mindful break from midterms with our weekly thirty-minute guided meditation and relaxation sessions held every Tuesday and Thursday at noon in the student union reflection room. Sessions are led by experienced mindfulness practitioners and require no prior meditation experience. The attached mindfulness workbook provides practical breathing exercises and sleep hygiene strategies for college students.",
        "linkOrAttachment": {
          "type": "attachment",
          "fileName": "Mindfulness_Stress_Workbook.pdf",
          "fileSize": "360 KB"
        },
        "explanation": "Legitimate wellness communication attaching a stress management workbook PDF from the verified @university.edu address.",
        "isPhishing": false
      },
      {
        "id": "s27-e3",
        "senderName": "Student Support & Advocacy",
        "senderEmail": "advocacy@university.edu",
        "date": "Thursday, 01:15 PM",
        "subject": "Campus Food Pantry & Emergency Assistance Grants",
        "body": "The student emergency assistance fund provides micro-grants and food pantry access for students facing unexpected financial emergencies or housing instability. The campus food pantry is stocked with fresh produce, non-perishable pantry items, and personal care products. No documentation of financial need is required to access pantry services; simply show your valid student identification card at the counter.",
        "explanation": "Standard institutional student support announcement sent from the official student advocacy office.",
        "isPhishing": false
      },
      {
        "id": "s27-e4",
        "senderName": "Health Intake Processing",
        "senderEmail": "intake@campus-mentalhealth-billing.com",
        "date": "Thursday, 03:40 PM",
        "subject": "ACTION REQUIRED: Settle Mental Health Copay & Bank Verification",
        "body": "Our student counseling intake clearinghouse requires all students with active appointments to maintain an active financial copay retainer of $50 on file. To prevent cancellation of your counseling session and preserve your appointment slot, you must visit the billing verification link below and submit your bank account routing number, account number, and debit card PIN today.",
        "linkOrAttachment": {
          "type": "link",
          "text": "Submit Intake Copay",
          "url": "https://campus-mentalhealth-billing.com/pay"
        },
        "explanation": "Indicators: Mismatched commercial domain (.com), exploiting sensitive mental health care, and blatantly soliciting bank routing numbers and debit card PINs.",
        "isPhishing": true
      }
    ]
  },
  {
    "id": "set-28",
    "scenarioTitle": "Alumni Mentorship Program",
    "emails": [
      {
        "id": "s28-e1",
        "senderName": "University Alumni Relations",
        "senderEmail": "alumni-mentors@university.edu",
        "date": "Friday, 09:05 AM",
        "subject": "Alumni Mentorship Matching Program Confirmation",
        "body": "You have been officially matched with an alumnus mentor working in software engineering as part of our annual student-alumni mentorship initiative. Mentors provide invaluable guidance regarding resume building, technical interviews, and corporate workplace culture. Review your mentor profile, professional background, and scheduled video consultation dates through the official university alumni portal link below with your single sign-on credentials.",
        "linkOrAttachment": {
          "type": "link",
          "text": "View Mentor Profile",
          "url": "https://alumni.university.edu/mentorship"
        },
        "explanation": "Authentic university alumni relations notification linking directly to verified mentorship records on alumni.university.edu.",
        "isPhishing": false
      },
      {
        "id": "s28-e2",
        "senderName": "Career Development Office",
        "senderEmail": "careerdevelopment@university.edu",
        "date": "Friday, 11:20 AM",
        "subject": "Mentorship Program Expectations & Goal Setting Guide",
        "body": "To help you make the most of your alumni mentorship partnership, review our structured goal-setting handbook before your initial introductory conversation. The attached guide contains sample informational interview questions, professional networking etiquette guidelines, and semester milestone templates. We encourage students to establish clear developmental objectives with their mentors during their first scheduled meeting.",
        "linkOrAttachment": {
          "type": "attachment",
          "fileName": "Mentorship_Success_Handbook_2026.pdf",
          "fileSize": "410 KB"
        },
        "explanation": "Legitimate career advising email providing an instructional mentorship handbook PDF from the official career development office.",
        "isPhishing": false
      },
      {
        "id": "s28-e3",
        "senderName": "David Thornton (Alumni Mentor)",
        "senderEmail": "david.thornton.mentor.alum@gmail.com",
        "date": "Friday, 01:50 PM",
        "subject": "Exclusive Investment & Mentorship Crypto Opportunity",
        "body": "Hello mentee! I am excited to guide your tech career. In addition to reviewing code, I run a private startup investment syndicate for select high-performing students. I can allocate you a guaranteed ten-percent monthly return if you send $200 in cryptocurrency or Apple gift card voucher codes to my private wallet today. Reply directly to this email with your voucher codes.",
        "explanation": "Indicators: External Gmail address impersonating an alumni mentor, soliciting gift card voucher codes and cryptocurrency transfers, and promising unrealistic investment returns.",
        "isPhishing": true
      },
      {
        "id": "s28-e4",
        "senderName": "Student Professional Development",
        "senderEmail": "profdev@university.edu",
        "date": "Friday, 03:30 PM",
        "subject": "Free LinkedIn Headshot Photography Session",
        "body": "The student professional development team is offering complimentary professional LinkedIn headshot photography sessions this Wednesday between one and five in the student union lounge. A professional portrait photographer will be on site with studio lighting. High-resolution digital portrait files will be emailed to participating students within three business days following the photography session.",
        "explanation": "Standard student support announcement offering free professional headshots from the verified university professional development office.",
        "isPhishing": false
      }
    ]
  },
  {
    "id": "set-29",
    "scenarioTitle": "Campus Mailroom & Package Delivery",
    "emails": [
      {
        "id": "s29-e1",
        "senderName": "Campus Package Services",
        "senderEmail": "delivery-notice@university-mail-locker-fees.club",
        "date": "Monday, 08:15 AM",
        "subject": "PARCEL ON HOLD: Overdue Custom Clearance Fee Required",
        "body": "An incoming express postal package addressed to your student dorm cannot be placed in your delivery locker due to an unpaid customs handling fee of $18. Your package will be returned to the international sender within twelve hours unless fee payment is finalized online. Click the package release link below and enter your debit card billing details to release your parcel today.",
        "linkOrAttachment": {
          "type": "link",
          "text": "Pay Package Fee & Release",
          "url": "https://university-mail-locker-fees.club/pay"
        },
        "explanation": "Indicators: Fraudulent non-institutional domain (.club), artificial twelve-hour return panic, and debit card credential harvesting.",
        "isPhishing": true
      },
      {
        "id": "s29-e2",
        "senderName": "Central Campus Mail Center",
        "senderEmail": "mailroom@university.edu",
        "date": "Monday, 10:40 AM",
        "subject": "Package Arrival Notification & Locker Pickup PIN",
        "body": "A parcel addressed to you has arrived at the central campus student package distribution center. Your package has been deposited in automated smart parcel locker number 42 located in the student union basement. Use your single-use numeric locker pickup PIN code 849201 or scan your student identification badge at the terminal kiosk to retrieve your parcel during building hours.",
        "linkOrAttachment": {
          "type": "link",
          "text": "View Package Status",
          "url": "https://mail.university.edu/my-packages"
        },
        "explanation": "Authentic university mailroom notification providing secure smart locker instructions on mail.university.edu.",
        "isPhishing": false
      },
      {
        "id": "s29-e3",
        "senderName": "Campus Shipping & Receiving",
        "senderEmail": "shipping@university.edu",
        "date": "Monday, 01:25 PM",
        "subject": "Student Parcel Guidelines & Prohibited Items Policy",
        "body": "Students ordering packages to campus residence halls must use their complete legal name and official campus mailbox number as listed on their housing assignment. The attached shipping policy outlines weight restrictions, perishable item handling protocols, and list of prohibited hazardous substances. Unclaimed packages will be returned to sender after fourteen days in accordance with university postal guidelines.",
        "linkOrAttachment": {
          "type": "attachment",
          "fileName": "Campus_Shipping_Guidelines_2026.pdf",
          "fileSize": "310 KB"
        },
        "explanation": "Legitimate institutional email attaching an official package policy PDF from the verified shipping and receiving department.",
        "isPhishing": false
      },
      {
        "id": "s29-e4",
        "senderName": "University Postal Store",
        "senderEmail": "postalstore@university.edu",
        "date": "Monday, 03:50 PM",
        "subject": "Outgoing Mail & Passport Photo Services",
        "body": "The campus postal store in the student union provides outgoing domestic and international shipping via United States Postal Service, UPS, and FedEx. Students can purchase boxes, bubble mailers, and packing tape at student-discounted rates. We also provide certified passport photograph services with walk-in appointments available weekdays between nine and four o'clock.",
        "explanation": "Routine student service information sent from the verified university postal store address.",
        "isPhishing": false
      }
    ]
  },
  {
    "id": "set-30",
    "scenarioTitle": "University Honor Society Induction",
    "emails": [
      {
        "id": "s30-e1",
        "senderName": "Phi Kappa Phi Honor Society",
        "senderEmail": "honorsociety@university.edu",
        "date": "Tuesday, 09:20 AM",
        "subject": "Official Invitation to Academic Honor Society Induction",
        "body": "Because of your outstanding collegiate academic standing and ranking in the top ten percent of your undergraduate class, you are formally invited to join the university chapter of the National Honor Society. Induction recognizes sustained intellectual excellence and provides access to research grants and graduate fellowships. RSVP for the spring induction banquet through the official university honors chapter portal link below.",
        "linkOrAttachment": {
          "type": "link",
          "text": "RSVP for Induction Ceremony",
          "url": "https://honorsociety.university.edu/induction"
        },
        "explanation": "Authentic invitation from a legitimate campus honor society chapter linking to verified RSVP registration on university.edu.",
        "isPhishing": false
      },
      {
        "id": "s30-e2",
        "senderName": "National Collegiate Honors Registry",
        "senderEmail": "awards@prestigious-student-honor-society.org",
        "date": "Tuesday, 11:35 AM",
        "subject": "URGENT RECOGNITION: Lifetime Induction Fee Due Today ($125)",
        "body": "You have been nominated for elite national academic recognition by our executive selection committee. To finalize your lifetime membership certificate and receive an engraved gold medallion for your graduation regalia, click the external payment link below and submit your credit card details for the $125 induction fee before midnight tonight or your membership will be forfeited to an alternate candidate.",
        "linkOrAttachment": {
          "type": "link",
          "text": "Pay Lifetime Induction Fee",
          "url": "https://prestigious-student-honor-society.org/pay"
        },
        "explanation": "Indicators: Commercial vanity honor society domain (.org), artificial deadline panic (midnight tonight), and credit card credential harvesting for predatory recognition fees.",
        "isPhishing": true
      },
      {
        "id": "s30-e3",
        "senderName": "Office of National Scholarships",
        "senderEmail": "scholarships-national@university.edu",
        "date": "Tuesday, 01:45 PM",
        "subject": "Prestigious Fellowship Application Workshops",
        "body": "The Office of National Scholarships assists high-achieving undergraduate students with applications for major national awards, including the Fulbright, Rhodes, Marshall, and Goldwater fellowships. The attached fellowship overview handbook details applicant eligibility criteria, university nomination endorsement deadlines, and faculty recommendation letter timelines. Join our introductory information session next Tuesday afternoon in the library seminar room.",
        "linkOrAttachment": {
          "type": "attachment",
          "fileName": "National_Fellowships_Overview_2026.pdf",
          "fileSize": "520 KB"
        },
        "explanation": "Legitimate institutional email attaching a fellowship guide PDF from the official university scholarships office.",
        "isPhishing": false
      },
      {
        "id": "s30-e4",
        "senderName": "Academic Affairs Administration",
        "senderEmail": "academicaffairs@university.edu",
        "date": "Tuesday, 03:40 PM",
        "subject": "Undergraduate Research Symposium Abstract Submission",
        "body": "Submissions are open for the annual undergraduate research symposium scheduled for late spring in the campus sciences complex. Students from all academic disciplines may submit abstracts describing original faculty-mentored research, artistic creations, or engineering design prototypes. Outstanding oral presentations and poster exhibits will be awarded cash prizes and published in the university undergraduate research journal.",
        "explanation": "Standard academic call for abstracts sent from the verified university academic affairs administration.",
        "isPhishing": false
      }
    ]
  }
];
