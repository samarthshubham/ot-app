// Create a CommonJS version of the seed file
require('dotenv').config({ path: './apps/backend/.env' });
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function hashPassword(password) {
    return bcrypt.hash(password, 10);
}

async function main() {
    console.log('Starting database seeding...');

    // Clear all existing data first
    console.log('Clearing existing data...');

    // Delete in reverse order of dependencies to avoid foreign key constraint issues
    await prisma.operationToKit.deleteMany({});
    await prisma.kitItem.deleteMany({});
    await prisma.orderItem.deleteMany({});
    await prisma.operationTeam.deleteMany({});
    await prisma.usageHistory.deleteMany({});
    await prisma.itemTransaction.deleteMany({});
    await prisma.itemRequest.deleteMany({});
    await prisma.operation.deleteMany({});
    await prisma.surgicalKit.deleteMany({});
    await prisma.purchaseOrder.deleteMany({});
    await prisma.operationTheater.deleteMany({});
    await prisma.operationType.deleteMany({});
    await prisma.inventoryItem.deleteMany({});
    await prisma.category.deleteMany({});
    await prisma.supplier.deleteMany({});
    await prisma.patient.deleteMany({});
    await prisma.provider.deleteMany({});
    await prisma.user.deleteMany({});

    console.log('Database cleared successfully. Starting to seed new data...');

    // Hash the password at runtime
    const hashedPassword = await hashPassword('password');

    // Create Users with role included
    const adminUser = await prisma.user.create({
        data: {
            name: 'Admin User',
            email: 'admin@ot-app.com',
            username: 'admin',
            password: hashedPassword, // Freshly hashed password
            role: 'Admin',
        },
    });

    const inventoryManagerUser = await prisma.user.create({
        data: {
            name: 'Inventory Manager',
            email: 'inventory@ot-app.com',
            username: 'inventory',
            password: hashedPassword, // Freshly hashed password
            role: 'Inventory Manager',
        },
    });

    const doctorUser = await prisma.user.create({
        data: {
            name: 'Dr. John Smith',
            email: 'john.smith@ot-app.com',
            username: 'dr.smith',
            password: hashedPassword, // Freshly hashed password
            role: 'Provider',
        },
    });

    const nurseUser = await prisma.user.create({
        data: {
            name: 'Nurse Sarah Johnson',
            email: 'sarah.johnson@ot-app.com',
            username: 'nurse.sarah',
            password: hashedPassword, // Freshly hashed password
            role: 'Provider',
        },
    });

    // Rest of the seed file remains the same
    // Create Categories
    const equipmentCategory = await prisma.category.create({
        data: {
            name: 'Medical Equipment',
            description: 'Durable medical equipment used in OT',
        },
    });

    const instrumentsCategory = await prisma.category.create({
        data: {
            name: 'Surgical Instruments',
            description: 'Tools and instruments used during surgery',
        },
    });

    const disposablesCategory = await prisma.category.create({
        data: {
            name: 'Disposables',
            description: 'Single-use items for surgery',
        },
    });

    const medicinesCategory = await prisma.category.create({
        data: {
            name: 'Medicines',
            description: 'Drugs and pharmaceuticals',
        },
    });

    // Create Suppliers
    const medicalSupplier = await prisma.supplier.create({
        data: {
            name: 'MedEquip Supplies',
            contactPerson: 'Robert Johnson',
            email: 'info@medequip.com',
            phone: '555-111-2222',
            address: '123 Medical Plaza, Healthcare City',
        },
    });

    const pharmaSupplier = await prisma.supplier.create({
        data: {
            name: 'PharmaPlus Ltd',
            contactPerson: 'Emma Davis',
            email: 'orders@pharmaplus.com',
            phone: '555-333-4444',
            address: '456 Pharma Road, Meditown',
        },
    });

    // Create Inventory Items
    const ventilatorItem = await prisma.inventoryItem.create({
        data: {
            name: 'Ventilator',
            description: 'ICU grade ventilator for respiratory support',
            type: 'Equipment',
            quantity: 5,
            unitPrice: 10000.0,
            minimumQuantity: 2,
            categoryId: equipmentCategory.id,
            supplierId: medicalSupplier.id,
            serialNumber: 'VNT-2023-001',
            location: 'Equipment Room A',
            status: 'Available',
            isConsumable: false,
        },
    });

    const scalpelItem = await prisma.inventoryItem.create({
        data: {
            name: 'Surgical Scalpel',
            description: 'Stainless steel surgical scalpel',
            type: 'Instrument',
            quantity: 50,
            unitPrice: 45.99,
            minimumQuantity: 20,
            categoryId: instrumentsCategory.id,
            supplierId: medicalSupplier.id,
            location: 'Surgical Tools Cabinet',
            status: 'Available',
            isConsumable: false,
        },
    });

    const glovesItem = await prisma.inventoryItem.create({
        data: {
            name: 'Surgical Gloves',
            description: 'Sterile latex surgical gloves',
            type: 'Disposable',
            quantity: 1000,
            unitPrice: 0.75,
            minimumQuantity: 200,
            expiryDate: new Date('2025-12-31'),
            categoryId: disposablesCategory.id,
            supplierId: medicalSupplier.id,
            location: 'Disposables Storage',
            status: 'Available',
            isConsumable: true,
        },
    });

    const antibioticsItem = await prisma.inventoryItem.create({
        data: {
            name: 'Broad Spectrum Antibiotics',
            description: 'Injectable antibiotics for surgery',
            type: 'Medicine',
            quantity: 100,
            unitPrice: 25.5,
            minimumQuantity: 30,
            expiryDate: new Date('2026-06-30'),
            categoryId: medicinesCategory.id,
            supplierId: pharmaSupplier.id,
            location: 'Medicine Cabinet',
            status: 'Available',
            isConsumable: true,
        },
    });

    const suturesItem = await prisma.inventoryItem.create({
        data: {
            name: 'Surgical Sutures',
            description: 'Absorbable surgical sutures',
            type: 'Disposable',
            quantity: 200,
            unitPrice: 10.25,
            minimumQuantity: 50,
            expiryDate: new Date('2026-02-28'),
            categoryId: disposablesCategory.id,
            supplierId: medicalSupplier.id,
            location: 'Disposables Storage',
            status: 'Available',
            isConsumable: true,
        },
    });

    // Create Providers
    const doctorProvider = await prisma.provider.create({
        data: {
            userId: doctorUser.id,
            type: 'Doctor',
            specialization: 'Cardiothoracic Surgery',
            licenseNumber: 'MD12345',
            department: 'Surgery',
            contactInfo: '555-123-4567',
        },
    });

    const nurseProvider = await prisma.provider.create({
        data: {
            userId: nurseUser.id,
            type: 'Nurse',
            specialization: 'Surgical Nursing',
            department: 'Surgery',
            contactInfo: '555-987-6543',
        },
    });

    // Create Patients
    const patient1 = await prisma.patient.create({
        data: {
            name: 'Alice Brown',
            age: 55,
            gender: 'Female',
            bloodGroup: 'O+',
            contactInfo: '555-123-9876',
            address: '789 Patient Lane, Healthville',
            medicalHistory: 'Hypertension, Diabetes Type 2',
        },
    });

    const patient2 = await prisma.patient.create({
        data: {
            name: 'Michael Wilson',
            age: 68,
            gender: 'Male',
            bloodGroup: 'A-',
            contactInfo: '555-456-7890',
            address: '321 Wellness Road, Meditown',
            medicalHistory: 'Coronary artery disease, Previous CABG 2020',
        },
    });

    // Create Surgical Kits
    const cardiacKit = await prisma.surgicalKit.create({
        data: {
            name: 'Cardiac Surgery Kit',
            description: 'Complete kit for cardiac surgeries',
            forSurgeryType: 'Cardiac Surgery',
        },
    });

    const generalKit = await prisma.surgicalKit.create({
        data: {
            name: 'General Surgery Kit',
            description: 'Basic kit for general surgeries',
            forSurgeryType: 'General Surgery',
        },
    });

    // Add Items to Kits
    await prisma.kitItem.createMany({
        data: [
            {
                kitId: cardiacKit.id,
                itemId: scalpelItem.id,
                quantity: 3,
                isRequired: true,
            },
            {
                kitId: cardiacKit.id,
                itemId: glovesItem.id,
                quantity: 10,
                isRequired: true,
            },
            {
                kitId: cardiacKit.id,
                itemId: suturesItem.id,
                quantity: 5,
                isRequired: true,
            },
            {
                kitId: generalKit.id,
                itemId: scalpelItem.id,
                quantity: 2,
                isRequired: true,
            },
            {
                kitId: generalKit.id,
                itemId: glovesItem.id,
                quantity: 6,
                isRequired: true,
            },
            {
                kitId: generalKit.id,
                itemId: suturesItem.id,
                quantity: 3,
                isRequired: true,
            },
        ],
    });

    // Create Operation Types
    const cabgType = await prisma.operationType.create({
        data: {
            name: 'Coronary Artery Bypass Grafting',
            description:
                'Surgical procedure to restore normal blood flow to an obstructed coronary artery',
            estimatedDuration: 300, // 5 hours
            requiredItems: 'Cardiac Surgery Kit, Ventilator, Antibiotics',
        },
    });

    const appendectomyType = await prisma.operationType.create({
        data: {
            name: 'Appendectomy',
            description: 'Surgical removal of the appendix',
            estimatedDuration: 90, // 1.5 hours
            requiredItems: 'General Surgery Kit, Antibiotics',
        },
    });

    // Create Operation Theaters
    const mainOT = await prisma.operationTheater.create({
        data: {
            name: 'Main OT 1',
            floor: '3rd Floor',
            building: 'Main Hospital',
            status: 'Available',
            capacity: 10,
            equipmentNotes: 'Fully equipped for all major surgeries',
        },
    });

    const cardiacOT = await prisma.operationTheater.create({
        data: {
            name: 'Cardiac OT',
            floor: '4th Floor',
            building: 'Specialty Wing',
            status: 'Available',
            capacity: 8,
            equipmentNotes: 'Specialized equipment for cardiac procedures',
        },
    });

    // Create Operations
    const operation1 = await prisma.operation.create({
        data: {
            operationNumber: 'OP-2025-001',
            operationDate: new Date('2025-04-20'),
            status: 'Scheduled',
            typeId: cabgType.id,
            patientId: patient2.id,
            primaryProviderId: doctorProvider.id,
            theaterId: cardiacOT.id,
            notes: 'Triple bypass required due to multiple blockages',
            duration: 300, // 5 hours
            startTime: new Date('2025-04-20T08:00:00Z'),
            endTime: new Date('2025-04-20T13:00:00Z'),
        },
    });

    // Create relationship between Operation and SurgicalKit using the new OperationToKit model
    await prisma.operationToKit.create({
        data: {
            operationId: operation1.id,
            kitId: cardiacKit.id,
            notes: 'Standard cardiac surgery kit required',
            assignedDate: new Date('2025-04-15'),
        },
    });

    // Add Team Members to Operation
    await prisma.operationTeam.create({
        data: {
            operationId: operation1.id,
            providerId: nurseProvider.id,
            role: 'Scrub Nurse',
            notes: 'Primary assisting nurse',
        },
    });

    // Create Item Requests
    await prisma.itemRequest.create({
        data: {
            requestNumber: 'REQ-2025-001',
            itemId: glovesItem.id,
            requestedBy: doctorProvider.id,
            operationId: operation1.id,
            quantity: 10,
            urgency: 'Normal',
            status: 'Approved',
            requestDate: new Date('2025-04-15'),
            approvedBy: adminUser.id,
            fulfilledDate: new Date('2025-04-16'),
            notes: 'Required for upcoming CABG procedure',
        },
    });

    await prisma.itemRequest.create({
        data: {
            requestNumber: 'REQ-2025-002',
            itemId: antibioticsItem.id,
            requestedBy: doctorProvider.id,
            operationId: operation1.id,
            quantity: 2,
            urgency: 'Normal',
            status: 'Approved',
            requestDate: new Date('2025-04-15'),
            approvedBy: adminUser.id,
            fulfilledDate: new Date('2025-04-16'),
            notes: 'Post-operative prophylaxis',
        },
    });

    // Create Item Transactions
    await prisma.itemTransaction.createMany({
        data: [
            {
                itemId: glovesItem.id,
                transactionType: 'Issued',
                quantity: 10,
                date: new Date('2025-04-16'),
                operationId: operation1.id,
                providerId: doctorProvider.id,
                notes: 'Issued for CABG procedure',
            },
            {
                itemId: antibioticsItem.id,
                transactionType: 'Issued',
                quantity: 2,
                date: new Date('2025-04-16'),
                operationId: operation1.id,
                providerId: doctorProvider.id,
                notes: 'Issued for post-op care',
            },
        ],
    });

    // Create Usage History
    await prisma.usageHistory.create({
        data: {
            itemId: glovesItem.id,
            providerId: doctorProvider.id,
            operationId: operation1.id,
            quantity: 8, // Used 8 out of 10 issued
            usageDate: new Date('2025-04-20'),
            notes: 'Used during procedure',
        },
    });

    // Create Purchase Order
    const purchaseOrder = await prisma.purchaseOrder.create({
        data: {
            orderNumber: 'PO-2025-001',
            supplierId: medicalSupplier.id,
            orderDate: new Date('2025-04-01'),
            expectedDelivery: new Date('2025-04-10'),
            status: 'Delivered',
            totalAmount: 2000.0,
            notes: 'Regular monthly order',
            createdBy: inventoryManagerUser.id,
        },
    });

    // Add Items to Purchase Order
    await prisma.orderItem.createMany({
        data: [
            {
                purchaseOrderId: purchaseOrder.id,
                itemName: 'Surgical Gloves',
                description: 'Sterile latex surgical gloves',
                quantity: 500,
                unitPrice: 0.75,
                totalPrice: 375.0,
                receivedQuantity: 500,
            },
            {
                purchaseOrderId: purchaseOrder.id,
                itemName: 'Surgical Sutures',
                description: 'Absorbable surgical sutures',
                quantity: 100,
                unitPrice: 10.25,
                totalPrice: 1025.0,
                receivedQuantity: 100,
            },
        ],
    });

    console.log('Database seeding completed successfully!');
}

main()
    .catch((e) => {
        console.error('Error during database seeding:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });