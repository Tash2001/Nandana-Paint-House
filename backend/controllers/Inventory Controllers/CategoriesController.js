const { insertCategoryS, fetchCategoriesS, updateCategoryS, deleteCategoryS } = require("../../services/Inventory Services/CategoriesService");




//Add supplier
async function addCategories(req,res) {
    const {name} = req.body;
    console.log("Category name :" , name);

    if(!name) {
        return res.status(400).json({error: "Category is Required"});
    }

    try {
        const result = await insertCategoryS(name);
        res.status(201).json(result);
        console.log("Category Created")
    } catch (error) {
        res.status(500).json({error: error.message});
        console.error("Category Creation Failed ",error.message)
    }
}

async function getCategory(req,res) {
    try {
        const cat = await fetchCategoriesS();
        res.status(200).json(cat);
        console.log("Category Fetched");

    } catch (error) {
        res.status(500).json({error:error.message});
    }
}

async function updateCategory(req, res) {
    const {id} = req.params;
    const {name} = req.body;

    console.log("id: ", id);
    console.log("name: ", name);

    if(!name || name.trim() === '') {
        return res.status(400).json({error: 'Category name is required'});
    }


    try {
        const result = await updateCategoryS(id, name.trim());
        res.status(200).json({message:"Category updated : ", result})
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function deleteCategory (req, res) {
    const {id} = req.params;

    try {
        await deleteCategoryS(id);
        res.status(200).json({message: "Category Deleted"});
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}

module.exports = {addCategories, getCategory, updateCategory, deleteCategory};