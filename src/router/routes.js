import Home from '@/pages/Home'
import Login from '@/pages/Home/Login'
import Register from '@/pages/Home/Register'
import RecruitInfo from '@/pages/Home/RecruitInfo'
import Admin from '@/pages/Admin'
import User from '@/pages/User'
import UserList from '@/pages/Admin/UserAdmin/UserList'
import Loading from '@/pages/Home/Loading'
import UserNoticeDetail from '@/pages/User/UserNoticeDetail'
import JobList from '@/pages/User/JobList'
import PersonalCenter from '@/pages/User/PersonalCenter'
import MyApply from '@/pages/User/MyApply'
import MyTest from '@/pages/User/MyTest'
import MyInterview from '@/pages/User/MyInterview'
import MyNotice from '@/pages/User/MyNotice'
import AdminPersonalCenter from '@/pages/Admin/AdminPersonalCenter'
import ApplyList from '@/pages/Admin/ApplyList'
import RecruitInfoList from '@/pages/Admin/RecruitInfo/RecruitInfoList'
import ReleaseJob from '@/pages/Admin/RecruitInfo/ReleaseJob'
import BlackList from '@/pages/Admin/UserAdmin/BlackList'
import ApplyDetail from '@/pages/Admin/ApplyList/ApplyDetail'
import JobDetail from '@/pages/Admin/RecruitInfo/JobDetail'
import EditJob from '@/pages/Admin/RecruitInfo/EditJob'
import UserDetail from '@/pages/Admin/UserAdmin/UserDetail'
import QuestionAdmin from '@/pages/Admin/ExamStytem/QuestionAdmin/QuestionAdmin'
import TestAdmin from '@/pages/Admin/ExamStytem/TestAdmin/TestAdmin'
import TestResultAdmin from '@/pages/Admin/ExamStytem/TestResultAdmin/TestResultAdmin'
import InterviewAdmin from '@/pages/Admin/ExamStytem/InterviewAdmin/InterviewAdmin'
import Grade from '@/pages/Admin/ExamStytem/TestResultAdmin/subpage/Grade'
import OnlineTestResult from '@/pages/Admin/ExamStytem/InterviewAdmin/OnlineTestResult'
import ResultList from '@/pages/Admin/ExamStytem/InterviewAdmin/ResultList'
import ResultReport from "@/pages/Admin/ExamStytem/InterviewAdmin/ResultReport";

let routes = [
    {
        path: "/admin",
        name: "Admin",
        component: Admin,
        meta: {auth: true},
        children: [
            // * 申请列表
            {// 求职申请列表
                path: 'applylist',
                component: ApplyList,
                name: "ApplyList",
                meta: {auth: true}
            },
            {// 求职申请详情
                path: 'applylist/:id',
                component: ApplyDetail,
                name: "ApplyDetail",
                meta: {auth: true}
            },
            // *招聘信息管理
            { // 招聘信息列表
                path: "recruitinfolist",
                component: RecruitInfoList,
                name: "RecruitInfoList",
                meta: {auth: true}
            },
            { // 招聘信息详情
                path: "recruitinfolist/:id",
                component: JobDetail,
                name: "JobDetail",
                meta: {auth: true}
            },
            { // 招聘信息详情
                path: "recruitinfolist/:id",
                component: EditJob,
                name: "EditJob",
                meta: {auth: true}
            },
            {
                // 发布招聘信息
                path: "releasejob",
                component: ReleaseJob,
                name: "ReleaseJob",
                meta: {auth: true}
            },
            // * 用户管理
            {
                // * 用户管理主页 用户列表
                path: "userlist",
                component: UserList,
                name: "UserList",
                meta: {auth: true}
            },
            {
                // * 用户管理主页 用户列表
                path: "userlist/:id",
                component: UserDetail,
                name: "UserDetailPage",
                meta: {auth: true}
            },
            {
                path: "blacklist",
                component: BlackList,
                name: "BlackList",
                meta: {auth: true}
            },

            // * 考核管理
            {
                path: "question",
                component: QuestionAdmin,
                name: "QuestionAdmin",
                meta: {auth: true}
            },
            {
                path: "testadmin",
                component: TestAdmin,
                name: "TestAdmin",
                meta: {auth: true}
            },
            {
                path: "testresult",
                component: TestResultAdmin,
                name: "TestResultAdmin",
                meta: {auth: true}
            },
            {
                path: "testresult/grade/:id",
                component: Grade,
                name: "Grade",
                meta: {auth: true}
            },
            {
                path: "onlinetestresult",
                component: OnlineTestResult,
                name: "OnlineTestResult",
                meta: {auth: true}
            },
            {
                path: "onlinetestresult/:id",
                component: ResultReport,
                name: "ResultReport",
                meta: {auth: true}
            },
            { // 成绩单列表
                path: "onlinetestresult/:paperId",
                component: ResultList,
                name: "ResultList",
                meta: {auth: true}
            },
            {
                path: "interview",
                component: InterviewAdmin,
                name: "InterviewAdmin",
                meta: {auth: true}
            },


            // *管理员个人中心
            {
                path: "admincenter",
                component: AdminPersonalCenter,
                name: "AdminPersonalCenter",
                meta: {auth: true}
            },
        ]
    },
    {
        path: "/user",
        name: "User",
        component: User,
        meta: {auth: true},
        children: [
            {
                path: "notice",
                name: "MyNotice",
                component: MyNotice,
                meta: {auth: true}
            },
            {
                path: "noticedetail",
                name: "UserNoticeDetail",
                component: UserNoticeDetail,
                meta: {auth: true}
            },
            {
                path: "joblist",
                name: "JobList",
                component: JobList,
                meta: {auth: true}
            },
            {
                path: 'center',
                name: "PersonalCenter",
                component: PersonalCenter,
                meta: {auth: true}
            },
            {
                path: 'apply',
                name: "MyApply",
                component: MyApply,
                meta: {auth: true}
            },
            {
                path: "test",
                name: "MyTest",
                component: MyTest,
                meta: {auth: true}
            },
            {
                name: "MyInterview",
                path: "interview",
                component: MyInterview
            },
        ]
    },
    {
        path: "/loading",
        name: "Loading",
        component: Loading,
        meta: {auth: false}
    },
    {
        path: "/",
        name: "Home",
        component: Home,
        meta: {
            auth: false
        }
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
        meta: {
            auth: false
        }
    },
    {
        path: "/register",
        name: "Register",
        component: Register,
        meta: {
            auth: false
        }

    },
    {
        path: "/rinfo",
        name: 'RecruitInfo',
        component: RecruitInfo,
        meta: {
            auth: false
        }
    },
];

export default routes;
