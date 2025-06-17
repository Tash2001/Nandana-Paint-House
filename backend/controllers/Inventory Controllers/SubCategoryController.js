
const { insertSCategoryS, fetchSCategoriesS, updateSCategoryS, deleteSCategoryS } = require("../../services/Inventory Services/SubCategoryService");




//Add supplier
async function addSCategories(req,res) {
    const {name} = req.body;
    console.log("Sub Category name :" , name);

    if(!name) {
        return res.status(400).json({error: "Sub Category is Required"});
    }

    try {
        const result = await insertSCategoryS(name);
        res.status(201).json(result);
        console.log("Sub Category Created")
    } catch (error) {
        res.status(500).json({error: error.message});
        console.error("Sub Category Creation Failed ",error.message)
    }
}

async function getSCategory(req,res) {
    try {
        const cat = await fetchSCategoriesS();
        res.status(200).json(cat);
        console.log("Sub Category Fetched");

    } catch (error) {
        res.status(500).json({error:error.message});
    }
}

async function updateSCategory(req, res) {
    const {id} = req.params;
    const {name} = req.body;

    console.log("id: ", id);
    console.log("name: ", name);

    if(!name || name.trim() === '') {
        return res.status(400).json({error: 'Sub Category name is required'});
    }


    try {
        const result = await updateSCategoryS(id, name.trim());
        res.status(200).json({message:"Sub Category updated : ", result})
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function deleteSCategory (req, res) {
    const {id} = req.params;

    try {
        await deleteSCategoryS(id);
        res.status(200).json({message: "SubCategory Deleted"});
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}

module.exports = {addSCategories, getSCategory, updateSCategory, deleteSCategory};