# ===========================================================================
# Project:   ONRTestApp
# ===========================================================================

config :ONR, :required => [:sproutcore]
config :ONR_test_app, :required => [:sproutcore, "sproutcore/forms", "sproutcore/animation", "sproutcore/statechart", :ONR]

