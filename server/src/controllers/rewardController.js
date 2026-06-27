const rewardService = require("../services/rewardService");
const asyncHandler = require("../utils/asyncHandler");
const sendResponse = require("../utils/sendResponse");

const createReward = asyncHandler(async (req, res) => {
    const reward = await rewardService.createReward(req.body);
    sendResponse(res, 201, true, "Reward created successfully", reward);
});

const updateReward = asyncHandler(async (req, res) => {
    const reward = await rewardService.updateReward(req.params.id, req.body);
    sendResponse(res, 200, true, "Reward updated successfully", reward);
});

const deleteReward = asyncHandler(async (req, res) => {
    const reward = await rewardService.deleteReward(req.params.id);
    sendResponse(res, 200, true, "Reward soft-deleted successfully", reward);
});

const getActiveRewards = asyncHandler(async (req, res) => {
    const rewards = await rewardService.getActiveRewards();
    sendResponse(res, 200, true, "Active rewards retrieved successfully", rewards);
});

const redeemReward = asyncHandler(async (req, res) => {
    const redemption = await rewardService.redeemReward(req.user._id, req.params.rewardId);
    sendResponse(res, 200, true, "Reward redeemed successfully", redemption);
});

const getMyRedemptionHistory = asyncHandler(async (req, res) => {
    const history = await rewardService.getMyRedemptionHistory(req.user._id);
    sendResponse(res, 200, true, "Redemption history retrieved successfully", history);
});

const getAllRedemptions = asyncHandler(async (req, res) => {
    const redemptions = await rewardService.getAllRedemptions();
    sendResponse(res, 200, true, "All redemptions retrieved successfully", redemptions);
});

const updateRedemptionStatus = asyncHandler(async (req, res) => {
    const redemption = await rewardService.updateRedemptionStatus(req.params.id, req.body);
    sendResponse(res, 200, true, "Redemption status updated successfully", redemption);
});

module.exports = {
    createReward,
    updateReward,
    deleteReward,
    getActiveRewards,
    redeemReward,
    getMyRedemptionHistory,
    getAllRedemptions,
    updateRedemptionStatus,
};
