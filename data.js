/* ==========================================================
   EDIT THIS FILE to change the site. No other file needs touching.
   - Add a project: copy a block in `projects`, change the fields.
   - Add experience / certs / skills: add a line to that list.
   - The resume section and the terminal read from the same data.
   ========================================================== */
const DATA = {
  profile: {
    name: "Ananthakrishna KP",
    role: "DevOps Engineer",
    location: "Kochi, India",
    available: "India and the UAE",
    plain: "I build the automation and cloud systems that take software from a developer's laptop to real users: safely, quickly and without manual work.",
    summary: "DevOps engineer with a year of production support at TCS, now building AWS and Kubernetes platforms with Terraform, GitOps and secure CI/CD.",
    email: "anandu4879@gmail.com",
    github: "https://github.com/anandu4879",
    linkedin: "https://www.linkedin.com/in/ananthakrishna-kp/",
    resume: "Ananthakrishna_KP_Resume.pdf"            // optional: put your PDF next to index.html
  },

  /* Typed on the home page. Each item is [command, plain-English answer]. */
  boot: [
    ["whoami", "Ananthakrishna KP, a DevOps engineer from Kochi, India."],
    ["what-i-do", "I help teams release software quickly and keep it running reliably."],
    ["how", "Automated releases, cloud infrastructure written as code, and monitoring that catches problems early."],
    ["status", "Open to work in India and the UAE."]
  ],

  /* The three tiles under the intro. Keep the wording non-technical. */
  does: [
    { h: "I automate releases", p: "When a developer saves new code, my setups test it and publish it automatically, with no manual steps.", tech: "GitHub Actions, Docker" },
    { h: "I build the cloud setup", p: "Servers, databases and networks are written as code, so they can be rebuilt in minutes and reviewed like any other change.", tech: "AWS, Terraform" },
    { h: "I keep it healthy", p: "Dashboards and alerts show problems early, and the system scales and recovers on its own.", tech: "Kubernetes, Prometheus, Grafana" }
  ],

  /* ---- PROJECTS -------------------------------------------------
     nodes: {key:{x,y,l:label,t:title,d:description,c:code snippet}}
       map size is 900 x 390; node boxes are 124 x 46
     edges: [from, to, type]  type "" = traffic packets,
            "d" = dashed amber (deploy), "o" = dotted cyan (metrics)
     pipeline: optional [[stage, log], ...] to override the default
  ---------------------------------------------------------------- */
  projects: [
    {
      id: "url-shortener", title: "URL Shortener on AWS", kind: "AWS",
      plain: "A website that turns long links into short ones. The interesting part is everything around it: it adds servers when traffic grows, survives failures, and deploys itself safely.",
      summary: "Production-style service behind an ALB with Auto Scaling, RDS PostgreSQL and a Redis cache. Terraform builds it, GitHub Actions deploys it through OIDC with no stored keys, Trivy scans images, Prometheus and Grafana watch it.",
      stack: ["Terraform", "ALB", "RDS", "Redis", "GitHub Actions", "Trivy", "Grafana"],
      repo: "https://github.com/anandu4879/url-shortener-devops", demo: "",
      nodes: {
        users: {x:70,y:195,l:"Users",t:"Traffic comes in",d:"Everything starts with a request. The rest of the map makes sure it gets an answer.",c:"# Public DNS points at the load balancer.\n# Nothing else is exposed to the internet."},
        alb: {x:250,y:195,l:"ALB",t:"Load balancer",d:"The only public entry point. Everything behind it lives in private subnets.",c:'resource "aws_lb" "app" {\n  load_balancer_type = "application"\n  subnets         = module.vpc.public_subnets\n  security_groups = [aws_security_group.alb.id]\n}'},
        app: {x:470,y:195,l:"App tier",t:"Auto Scaling app tier",d:"Capacity follows load. A target-tracking policy adds instances before users notice.",c:'resource "aws_autoscaling_policy" "cpu" {\n  policy_type = "TargetTrackingScaling"\n  autoscaling_group_name = aws_autoscaling_group.app.name\n  target_tracking_configuration {\n    predefined_metric_specification {\n      predefined_metric_type = "ASGAverageCPUUtilization"\n    }\n    target_value = 60\n  }\n}'},
        cache: {x:700,y:100,l:"Redis",t:"Redis cache",d:"Hot short links are served from memory, which keeps the database calm.",c:'resource "aws_elasticache_replication_group" "r" {\n  automatic_failover_enabled = true\n  at_rest_encryption_enabled = true\n  num_cache_clusters         = 2\n}'},
        db: {x:700,y:290,l:"RDS Postgres",t:"RDS PostgreSQL",d:"The source of truth. Encrypted, with a standby in another zone.",c:'resource "aws_db_instance" "pg" {\n  engine            = "postgres"\n  multi_az          = true\n  storage_encrypted = true\n}'},
        ci: {x:470,y:60,l:"GitHub Actions",t:"CI/CD with OIDC",d:"Pipelines get short-lived credentials by proving who they are. No access keys sit in the repo.",c:'condition {\n  test     = "StringLike"\n  variable = "token.actions.githubusercontent.com:sub"\n  values   = ["repo:YOUR_USER/YOUR_REPO:*"]\n}'},
        mon: {x:470,y:335,l:"Prometheus",t:"Monitoring",d:"Metrics feed Grafana dashboards and alerts, so problems page me before users complain.",c:'- alert: HighErrorRate\n  expr: rate(http_requests_total{code=~"5.."}[5m]) > 0.05\n  for: 5m\n  labels: {severity: page}'}
      },
      edges: [["users","alb"],["alb","app"],["app","cache"],["app","db"],["ci","app","d"],["app","mon","o"]]
    },
    {
      id: "codestep", title: "CodeStep", kind: "Kubernetes",
      plain: "A setup where the website running live always matches what is written in Git. To release or undo a change, you change the code and the system does the rest.",
      summary: "A GitOps platform on Kubernetes. Argo CD watches Git and keeps the cluster matching it, so a deploy is a pull request and a rollback is a revert.",
      stack: ["Kubernetes", "Argo CD", "GitOps", "Helm"],
      repo: "https://github.com/anandu4879/codestep", demo: "https://codestep.onrender.com/",
      nodes: {
        dev: {x:70,y:195,l:"Developer",t:"A change is a pull request",d:"Nobody runs kubectl against production. Changes go through review in Git.",c:"git checkout -b feature/new-limit\ngit push origin feature/new-limit"},
        git: {x:260,y:195,l:"Git repo",t:"Git is the source of truth",d:"The repo describes the desired state of every environment.",c:"k8s/\n  base/\n  overlays/dev/\n  overlays/prod/"},
        argo: {x:480,y:195,l:"Argo CD",t:"Argo CD reconciles",d:"It compares Git with the cluster and fixes any difference. Manual drift gets reverted.",c:"apiVersion: argoproj.io/v1alpha1\nkind: Application\nspec:\n  source: {repoURL: YOUR_REPO, path: k8s/overlays/prod}\n  syncPolicy:\n    automated: {prune: true, selfHeal: true}"},
        k8s: {x:700,y:195,l:"Cluster",t:"Kubernetes cluster",d:"Workloads run here and report health back to Argo CD.",c:"kubectl get pods -n app\nNAME        READY  STATUS\nweb-7d9f    1/1    Running"},
        ci: {x:260,y:60,l:"CI build",t:"CI builds the image",d:"CI tests, scans and pushes the image, then bumps the tag in Git.",c:"trivy image app:$GIT_SHA\nyq -i '.image.tag = strenv(GIT_SHA)' values.yaml"}
      },
      edges: [["dev","git"],["git","argo"],["argo","k8s"],["ci","git","d"]]
    }
  ],

  /* Default CI/CD demo. A project can override it with its own `pipeline`. */
  pipeline: [
    ["Checkout", "git clone --depth 1 repo\nHEAD is at 7c1e9a2"],
    ["Validate", "terraform fmt -check\nterraform validate\nSuccess! The configuration is valid."],
    ["Scan image", "trivy image app:7c1e9a2\nCRITICAL: 0  HIGH: 0"],
    ["Plan", "terraform plan\nPlan: 2 to add, 1 to change, 0 to destroy."],
    ["Assume role", "requesting GitHub OIDC token\nsts:AssumeRoleWithWebIdentity ok\ncredentials expire in 1h"],
    ["Apply", "terraform apply -auto-approve\nApply complete! Resources: 2 added, 1 changed."],
    ["Smoke test", "curl -fs https://app/health\n200 OK, targets healthy 2/2"]
  ],

  experience: [
    {
      org: "TCS, Kochi",
      role: "Application Operations Engineer",
      period: "Sept 2026",
      points: [
        "Production support for enterprise applications: incident response, monitoring and root-cause analysis.",
        "Investigate production incidents using Grafana dashboards and Kibana log analysis, performing Root Cause Analysis (RCA) to identify recurring issues and support long-term fixes.",
        "Troubleshoot Autosys batch job failures by analysing logs, validating job dependencies, and coordinating with application teams to restore business-critical workflows.",
        "Execute production Change Requests (CRQs) following organisational change management processes, including pre-change validation, deployment, post-change verification, and rollback readiness.",
        "Resolve production issues involving application failures, disk-space exhaustion, service availability, and backend connectivity while meeting agreed SLA commitments.",
        "Collaborate with cross-functional teams to restore services quickly and document incident resolutions for future reference."
      ]
    }
  ],

  skills: {
    "Cloud": "EC2, VPC, IAM, S3, RDS, ALB, Auto Scaling, ECS Fargate, Secrets Manager",
    "Infrastructure as code": "Terraform with modules, remote state and reviewed plans",
    "Containers": "Docker, Kubernetes, Helm, Argo CD",
    "Delivery and security": "GitHub Actions, OIDC, Trivy, least-privilege IAM",
    "Observability": "Prometheus, Grafana, alerting, log analysis",
    "Foundations": "Linux, networking, iptables, Apache and Nginx, Bash, Python"
  },

  certs: [
  { name: "KodeKloud -DevOps", status: "Completed", note: "completed the course" },
  ]
};
