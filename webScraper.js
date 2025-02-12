const request = require("request");
const cheerio = require("cheerio");
const prompt = require('prompt-sync')();

const link = prompt("please enter an indeed job link: ");
function getJobInfo(link) {
    let newPosting = new Object();
    request(link, (err, res, body) => {
        if (err || res.statusCode != 200) return newPosting;
        const $ = cheerio.load(body);
        const jobInfoContainer = $('#viewJobSSRRoot');
        newPosting.jobTitle = jobInfoContainer.find('.jobsearch-JobInfoHeader-title-container').text().trim();
        let companyHeaderText = jobInfoContainer.find('.jobsearch-InlineCompanyRating').text();
        newPosting.companyName = companyHeaderText.replace(jobInfoContainer.find('.icl-Ratings-count').first().text(), "").trim();
        let fullHeaderText = jobInfoContainer.find('.jobsearch-CompanyInfoContainer').text();
        newPosting.jobLocation = fullHeaderText.replace(companyHeaderText, "").trim();
        newPosting.jobDescription = jobInfoContainer.find('#jobDescriptionText').text().trim();
    })
    setTimeout(() => {console.log(newPosting);}, 5000);
    
};
getJobInfo(link);
module.exports = getJobInfo;
