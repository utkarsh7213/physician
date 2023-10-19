const sql_conn = require('../db');
const express = require('express');
const route = express.Router();
const officegen = require('officegen');
const fs = require('fs');
const path = require('path');
const sendFax = require('./fax');

// const InterFAX = require('interfax');
// require('dotenv').config();

// const interfax = new InterFAX({
//   username: process.env.FAX_USERNAME,
//   password: process.env.FAX_PASSWORD
// });

// function sendFax(file_path) {
//     // console.log(file_path);
//     interfax.outbound.deliver({
//         faxNumber: process.env.FAX_NUMBER,
//         file: file_path
//     })
//     .then(fax => {
//         console.log("Fax Sent Successfully");
//     })
//     .catch(error => {
//         console.error("Error sending fax:");
//     });
// }


route.get('/:id', async (req, res) => {
    const patient_id = req.params.id;
    const utc = req.query.day + ' ' + req.query.time;

    const fileName = `${patient_id}_${utc}.docx`;
    const file_doc = fileName.replace(/[:-]/g, '');

    const output_path = path.join(__dirname, '../faxed_files');
    const doc_file = path.join(output_path, file_doc);

    if (fs.existsSync(doc_file)) {
        const fileStream = fs.createReadStream(doc_file);

        const delayInMilliseconds = 3000;
        setTimeout(() => {
            sendFax(fileStream);
        }, delayInMilliseconds);
        res.status(200).send('Fax transmission initiated.');
        console.log('sent success from file');
    } else {

        const fetch_doc = `SELECT * FROM PATIENT_INFO WHERE PATIENT_ID = '${patient_id}' AND UTC = '${utc}'`;
        const prescriber_id = req.session.prescriberID;

        await sql_conn.query(fetch_doc, async (err, doc) => {
            if (err) {
                console.error('Error fetching DOCFile from the database:', err);
                return res.status(500).send('Error fetching DOCFile from the database');
            }
            await sql_conn.query(`SELECT * FROM REGISTERED_PRESCRIBER WHERE ID = '${prescriber_id}'`, async (err, prescriber_result) => {
                if (err) throw err;
                let docx = officegen('docx');
                docx.on('finalize', (written) => {
                    setTimeout(async () => {
                        try {
                            console.log("Docx file created successfully");

                            const fileStream = fs.createReadStream(doc_file);
                            
                            const delayInMilliseconds = 3000;
                            setTimeout(() => {
                                sendFax(fileStream);
                            }, delayInMilliseconds);
                            res.status(200).send('Fax transmission initiated.');
                            console.log("sent");
                        } catch (err) {
                            console.error('Error processing the finalized document:', err);
                        }
                    }, 3000);
                });
                docx.on('error', (err) => {
                    console.log(err);
                });
                let para_obj = docx.createP({ align: 'right' });
                para_obj.addText("Valid if transmitted by facsimile machine only", {
                    border: 'dotted', borderSize: 12, borderColor: '88CCFF'
                });
                const table = [
                    [{
                        val: `PATIENT INFORMATION`,
                        opts: {
                            sz: 18, b: true, align: 'left', cellColWidth: 4051, color: 'f5f5f5',
                            shd: {
                                fill: '6082B6'
                            },
                            fontFamily: 'Serif'
                        }
                    },
                    {
                        val: ``,
                        opts: {
                            cellColWidth: 4261,
                        }
                    },],
                    [`FIRST NAME: ${doc[0].PATIENT_FIRSTNAME}`, `LAST NAME: ${doc[0].PATIENT_LASTNAME}`], [`DATE OF BIRTH: ${doc[0].DATE}/${doc[0].MONTH}/${doc[0].YEAR}`], [`PHONE: ${doc[0].PHONE_NO}`],
                    [`ADDRESS: ${doc[0].PATIENT_EMAIL}`], [`CITY: ${doc[0].CITY}`, `STATE: ${doc[0]._STATE}`, `ZIP: ${doc[0].ZIP}`],
                    [`ALLERGIES:`]
                ];
                const tableStyle = {
                    tableColWidth: 8261, tableAlign: "left", tableFontFamily: "Serif", sz: 18
                };
                const tableOptions = {
                    borders: true, borderSize: 1, borderColor: '000000',
                };
                const tableDoc = docx.createTable(table, tableStyle, tableOptions);
                docx.createP();
                para_obj.addLineBreak()
                const table2 = [
                    [{
                        val: `PRESCRIPTION INFORMATION`,
                        opts: {
                            sz: 18, b: true, align: 'left', cellColWidth: 4051, color: 'f5f5f5',
                            shd: {
                                fill: '6082B6'
                            },
                            fontFamily: 'Serif'
                        }
                    },
                    {
                        val: ``,
                        opts: {
                            cellColWidth: 4261,
                        }
                    },],
                    [`DRUG: ${doc[0].MEDICINE}`], [`QUANTITY: ${doc[0].SIZE}`], [`REFILLS: ${doc[0].REFILLS}`], [`INSTRUCTIONS/SIG: ${doc[0].INSTRUCTIONS}`], [`COMMENTS:`]
                ];
                const tableStyle2 = {
                    tableColWidth: 8261, tableAlign: "left", tableFontFamily: "Serif", sz: 18
                };
                const tableOptions2 = {
                    borders: true,
                };
                const tableDoc2 = docx.createTable(table2, tableStyle2, tableOptions2);
                docx.createP();
                para_obj.addLineBreak()
                const table3 = [
                    [{
                        val: `PRESCRIBER`,
                        opts: {
                            sz: 18, b: true, align: 'left', cellColWidth: 4051, color: 'f5f5f5',
                            shd: {
                                // fill: '0096FF'
                                fill: '6082B6'
                            },
                            fontFamily: 'Serif'
                        }
                    },
                    {
                        val: ``,
                        opts: {
                            cellColWidth: 4261,
                        }
                    },],
                    [`NAME: ${prescriber_result[0].FIRST_NAME} ${prescriber_result[0].LAST_NAME}`, `TEL: ${prescriber_result[0].CONTACT}`, `NPI: ${prescriber_result[0].NPI}`],
                    [`ADDRESS: ${prescriber_result[0].ADDRESS1} ${prescriber_result[0].ADDRESS2}`],
                    [`SIGNATURE:`, `DATE: ${utc}`],
                ];
                const tableStyle3 = {
                    tableColWidth: 8261, tableAlign: "left", tableFontFamily: "Serif", sz: 18
                };
                const tableOptions3 = {
                    borders: true,
                };
                const tableDoc3 = docx.createTable(table3, tableStyle3, tableOptions3);
                const para = docx.createP();
                para.addLineBreak();
                para.addText("Disclaimer: Altering the default doctor fax message could conflict with state or federal regulations. Before modifying the text above, please reference your pharmacy board guidelines for proper formatting.");

                let out = await fs.createWriteStream(doc_file);

                out.on('error', (err) => {
                    console.log(err);
                });

                await docx.generate(out);

            });
        });

    }
});

// res.end();

// res.send(file_doc)
// const sendFax = require('./fax');
// const delayInMilliseconds = 3000;
// setTimeout(sendFax, delayInMilliseconds);
module.exports = route;