const { insertBrandsS, fetchBrandsS, updateBrandS, deleteBranS } = require("../../services/Inventory Services/BrandsService");




//Add supplier
async function addBrand(req,res) {
    const {name} = req.body;
    console.log("Brand name :" , name);

    if(!name) {
        return res.status(400).json({error: "Brand is Required"});
    }

    try {
        const result = await insertBrandsS(name);
        res.status(201).json(result);
        console.log("Brand Created")
    } catch (error) {
        res.status(500).json({error: error.message});
        console.error("Brand Creation Failed ",error.message)
    }
}

async function getBrand(req,res) {
    try {
        const brand = await fetchBrandsS();
        res.status(200).json(brand);
        console.log("Brands Fetched");

    } catch (error) {
        res.status(500).json({error:error.message});
    }
}

async function updateBrands(req, res) {
    const {id} = req.params;
    const {name} = req.body;

    console.log("id: ", id);
    console.log("name: ", name);

    if(!name || name.trim() === '') {
        return res.status(400).json({error: 'Brand name is required'});
    }


    try {
        const result = await updateBrandS(id, name.trim());
        res.status(200).json({message:"Brand updated : ", result})
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function deleteBrand (req, res) {
    const {id} = req.params;

    try {
        await deleteBranS(id);
        res.status(200).json({message: "Brand Deleted"});
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}

module.exports = {addBrand, getBrand, updateBrands, deleteBrand};